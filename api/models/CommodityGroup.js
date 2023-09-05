const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'commodity_groups';

const CommodityGroup = sequelize.define(
  'CommodityGroup',
  {
    name: {
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
CommodityGroup.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = CommodityGroup;
