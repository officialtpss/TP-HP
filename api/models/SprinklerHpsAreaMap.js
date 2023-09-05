const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'sprinkler_hpsarea_map';
const SprinklerHpsAreaMap = sequelize.define(
  'SprinklerHpsAreaMap',
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
SprinklerHpsAreaMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = SprinklerHpsAreaMap;
