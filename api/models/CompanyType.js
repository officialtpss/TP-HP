const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'company_type';

const CompanyType = sequelize.define(
  'CompanyType',
  {
    type: {
      type: Sequelize.STRING,
      unique: false,
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
CompanyType.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = CompanyType;
