/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require('path');
console.log(path.resolve(__dirname,'dev.sqlite3'))

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,'dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, './migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, './seeds')
    },
    pool: {
      min: 1,
      max: 5,
      afterCreate: (conn, done) => {
        // Habilitar foreign keys no SQLite
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    // Tempo máximo para adquirir uma conexão: 5 segundos
    acquireConnectionTimeout: 5000, 
    log: {
      warn(message) {
        console.warn('Warning:', message);
      },
      error(message) {
        console.error('Error:', message);
      },
      deprecate(message) {
        console.log('Deprecate:', message);
      },
      debug(message) {
        console.log('Debug:', message);
      }
    },
    // debug: true
  },

};
