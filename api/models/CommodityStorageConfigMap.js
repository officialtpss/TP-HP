const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_comodity_storage_config_map';
const CommodityStorageConfigMap = sequelize.define(
  'CommodityStorageConfigMap',
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
CommodityStorageConfigMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = CommodityStorageConfigMap;
