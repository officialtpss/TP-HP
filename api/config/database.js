const Sequelize = require('sequelize');
const path = require('path');

const config = require('./appconfig');

const { production, testing, development } = config.db;
const { env } = config.app;

let database;

switch (env) {
  case 'production':
    database = new Sequelize(
      production.database,
      production.username,
      production.password,
      {
        host: production.host,
        dialect: production.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        logging: false
      }
    );
    break;
  case 'testing':
    database = new Sequelize(
      testing.database,
      testing.username,
      testing.password,
      {
        host: testing.host,
        dialect: testing.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        logging: false
      }
    );
    break;
  default:
    database = new Sequelize(
      development.database,
      development.username,
      development.password,
      {
        host: development.host,
        dialect: development.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
        logging: false
      }
    );
}

module.exports = database;
