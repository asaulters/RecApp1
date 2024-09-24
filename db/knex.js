// db/knex.js
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './db/recipe-app.sqlite3' // Make sure this path is correct.
    },
    useNullAsDefault: true
  });
  
  module.exports = knex;
  