const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'sprinkler_storage_config_map';
const SprinklerStorageConfigMap = sequelize.define(
  'SprinklerStorageConfigMap',
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
SprinklerStorageConfigMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = SprinklerStorageConfigMap;
