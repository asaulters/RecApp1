// knexfile.js

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/recipes.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
