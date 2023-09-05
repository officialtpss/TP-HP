const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'company_contact_map';

const CompanyContactMap = sequelize.define(
  'CompanyContactMap',
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
CompanyContactMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = CompanyContactMap;
