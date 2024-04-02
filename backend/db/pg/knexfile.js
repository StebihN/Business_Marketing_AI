// Update with your config settings.
const dotenv = require('dotenv')  
dotenv.config({ path: '../../.env' })
/**
 * @type { Object.<string, import('knex').Knex.Config> }
 */
module.exports = {

	development: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_DATABASE,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: process.env.DB_TABLENAME
		}
	}

};
