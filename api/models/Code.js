const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'code';

const Code = sequelize.define(
  'Code',
  {
    short_code: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    full_name: {
      type: Sequelize.STRING,
    },
    years: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    code_type: {
      type: Sequelize.ENUM,
      values: ['Global', 'State', 'Jurisdiction'],
      defaultValue: 'Global',
    },
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
Code.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Code;
