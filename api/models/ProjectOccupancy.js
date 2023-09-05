const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_occupancy';

const ProjectOccupancy = sequelize.define(
  'ProjectOccupancy',
  {
    value: {
      type: Sequelize.STRING,
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
  {
    underscored: true,
  },
);
// eslint-disable-next-line
ProjectOccupancy.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectOccupancy;
