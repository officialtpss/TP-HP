const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'company_type_mapping';
const CompanyTypeMap = sequelize.define(
  'CompanyTypeMap',
  {
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
CompanyTypeMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = CompanyTypeMap;
