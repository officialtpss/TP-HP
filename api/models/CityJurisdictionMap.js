const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'city_jurisdiction_map';
const CityJurisdictionMap = sequelize.define(
  'CityJurisdictionMap',
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
CityJurisdictionMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = CityJurisdictionMap;
