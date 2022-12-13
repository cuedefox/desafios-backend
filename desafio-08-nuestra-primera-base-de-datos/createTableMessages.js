const { optionsSQLite3 } = require('./options/config.js');
const knex = require('knex')(optionsSQLite3);

knex.schema.createTable('messages', table => {
	table.increments('id')
	table.string('email')
	table.string('message')
	table.string('date')
})
	.then(() => console.log('Table created'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())