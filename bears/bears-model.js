const knex = require('knex');
const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/bears.db3'
    },
    useNullAsDefault: true
  }
  const db = knex(knexConfig)


module.exports = {
     find,
     findById,
     update,
     remove, 
     add
}

function find() {
    return db('bears')
}

function findById(id) {
    return db('bears').where({id: id})
}

function update(id, changes) {
    return db('bears').where({id: id}).update(changes)
}

function update(id, changes) {
    return db('bears').where({id: id}).update(changes)
}

function remove(id) {
    return db('bears').where({id: id}).del()
}

function add(body) {
    return db('bears').insert(body)
}