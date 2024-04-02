const db = require('../db/pg/db');
const bcrypt = require('bcrypt');

exports.getDetails = async (req, res) => {
	try {

		const id = req.params.id;

		const user = await db('users')
			.where('id', id)
			.select('username', 'email')
			.first();

		return res.status(200).json(user);

	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ error: 'Server error' });
	}
}
exports.updateUser = async (req, res) => {
	try {

		console.log('updating user');

		const id = req.params.id;
		const { username, email } = req.body;

		const numRowsUpdated = await db('users')
			.where('id', id)
			.update({
				username: username,
				email: email
			});

		console.log(numRowsUpdated);

		if (numRowsUpdated === 0) {
			return res.status(404).json({ error: 'User not found!' });
		}

		return res.status(204).send();

	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ error: 'Server error' });
	}
}

exports.updatePassword = async (req, res) => {
	try {

		console.log('changing password');

		const id = req.params.id;
		const { oldPassword, newPassword } = req.body;

		const user = await db('users').where({ id }).first();

		console.log(user);

		if (!user) {
			return res.status(404).json({ error: 'User not found!' });
		}

		const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

		console.log(isOldPasswordValid);

		if (!isOldPasswordValid) {
			return res.status(401).json({ error: 'Old password is incorrect' });
		}

		const bcryptPassword = await bcrypt.hash(newPassword, 10);
		await db('users').where({ id }).update({ password: bcryptPassword });

		return res.status(204).send();

	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ error: 'Server error' });
	}
}