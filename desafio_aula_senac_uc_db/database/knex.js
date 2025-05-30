const knex = require('knex')
const knexfile = require('./knexfile.cjs')

const db = knex(knexfile.development)
db('stock').then(res => console.log(res))

module.exports = db