const bcrypt = require('bcrypt');
const db = require('../db/pg/db');
const jwtGenerator = require('./jwt/jwtGenerator');

exports.Register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const existingUser = await db('users').where({ email: email }).first();

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists!' });
        }

        const salt = await bcrypt.genSalt(10);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await db('users').insert({
            username: username,
            email: email,
            password: bcryptPassword
        }).returning('*');

        console.log(newUser);

        const token = jwtGenerator(newUser[0].id);

        return res.status(201).json({ token });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server error' });

    }
}

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db('users').select().where('email', email);

        if (user.length === 0) {
            return res.status(401).json({ error: 'Email or password is incorrect!' });
        }

        const validPassword = await bcrypt.compare(
            password,
            user[0].password
        );

        if (!validPassword) {
            return res.status(401).json({ error: 'Email or password is incorrect!' });
        }

        const token = jwtGenerator(user[0].id);

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server error' });
    }
}