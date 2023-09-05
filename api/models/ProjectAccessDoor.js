const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_access_door';

const ProjectAccessDoor = sequelize.define(
  'ProjectAccessDoor',
  {
    hps_extended_spacing: {
      type: Sequelize.ENUM,
      values: ['200', '125'],
      defaultValue: '200',
    },
    wall_anlysis: {
      type: Sequelize.STRING,
    },
    north_wall: {
      type: Sequelize.STRING,
    },
    additional_north_wall: {
      type: Sequelize.STRING,
    },
    east_wall: {
      type: Sequelize.STRING,
    },
    additional_east_wall: {
      type: Sequelize.STRING,
    },
    south_wall: {
      type: Sequelize.STRING,
    },
    additional_south_wall: {
      type: Sequelize.STRING,
    },
    west_wall: {
      type: Sequelize.STRING,
    },
    additional_west_wall: {
      type: Sequelize.STRING,
    },
    approved_hsp_area: {
      type: Sequelize.STRING,
    },
    exosting_hps_tech_report: {
      type: Sequelize.ENUM,
      values: ['yes', 'no'],
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
ProjectAccessDoor.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectAccessDoor;
