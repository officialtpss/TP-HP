const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'state';

const State = sequelize.define(
  'State',
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    // global means acess for all users
    is_global: {
      type: Sequelize.ENUM,
      values: ['yes', 'no'],
      defaultValue: 'no',
    },
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'deleted'],
      defaultValue: 'active',
    },
  },
  {
    tableName,
  },
  {
    underscored: true,
  },
);
// eslint-disable-next-line
State.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = State;
