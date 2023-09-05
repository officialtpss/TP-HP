const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'agency_service';

const AgencyService = sequelize.define(
  'AgencyService',
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    }
  },
  {
    tableName,
  },
  {
    underscored: true,
  },
);
// eslint-disable-next-line
AgencyService.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = AgencyService;
