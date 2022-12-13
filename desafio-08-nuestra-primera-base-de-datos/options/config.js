const optionsSQLite3 = {
	client: 'sqlite3',
	connection: {
		filename: './db/ecommerce.sqlite'
	},
	useNullAsDefault: true
}

const optionsMariaDB = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'ecommerce'
	}
}

module.exports = { optionsSQLite3, optionsMariaDB };