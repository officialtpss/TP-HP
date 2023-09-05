const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'commodity_class';

const CommodityClass = sequelize.define(
  'CommodityClass',
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
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
);

// eslint-disable-next-line
CommodityClass.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = CommodityClass;
