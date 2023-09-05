const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_hps_area';

const ProjectHpsArea = sequelize.define(
  'ProjectHpsArea',
  {
    area: {
      type: Sequelize.STRING,
    },
    warehouse_area: {
      type: Sequelize.STRING,
    },
    existing_hps_area: {
      type: Sequelize.STRING,
    },
    hps_area_scope: {
      type: Sequelize.STRING,
    },
    hazard_designation: {
      type: Sequelize.STRING,
    },
    engineering_analysis: {
      type: Sequelize.STRING,
    },
    public_occupancy: {
      type: Sequelize.STRING,
    },
    detection_present: {
      type: Sequelize.STRING,
    },
    access_provided: {
      type: Sequelize.STRING,
    },
    travel_distance: {
      type: Sequelize.STRING,
    },
    storage_hps_area: {
      type: Sequelize.STRING,
    },
    mechanical_stocking: {
      type: Sequelize.STRING,
    },
    hamat_present: {
      type: Sequelize.STRING,
    },
    commodities: {
      type: Sequelize.STRING,
    },
    storage_area: {
      type: Sequelize.STRING,
    },
    total_hps_area: {
      type: Sequelize.STRING,
    },
    hps_palletized_shelf: {
      type: Sequelize.STRING,
    },
    palletized_storage_dims_w: {
      type: Sequelize.STRING,
    },
    palletized_storage_dims_d: {
      type: Sequelize.STRING,
    },
    palletized_storage_height: {
      type: Sequelize.STRING,
    },
    palletized_storage_volume: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'deleted'],
      defaultValue: 'active',
    },
    copy_hps_area_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
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
ProjectHpsArea.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectHpsArea;
