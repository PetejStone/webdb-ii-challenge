const knex = require('knex');
const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.db3'
    },
    useNullAsDefault: true
  }
  const db = knex(knexConfig)


module.exports = {
     find,
     findById,
    // update,
    // remove, 
    // add
}

function find() {
    return db('zoos')
}

function findById(id) {
    return db('zoos').where({id: id})
}
