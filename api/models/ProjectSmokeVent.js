const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_smoke_vent';

const ProjectSmokeVent = sequelize.define(
  'ProjectSmokeVent',
  {
    lable_name: {
      type: Sequelize.STRING,
    },
    beyond_hps_area: {
      type: Sequelize.STRING,
    },
    copy_wrh_area: {
      type: Sequelize.STRING,
    },
    skylight_provided: {
      type: Sequelize.STRING,
    },
    beyond_smoke_event: {
      type: Sequelize.STRING,
    },
    link_temperature: {
      type: Sequelize.STRING,
    },
    link_temperature_opton: {
      type: Sequelize.STRING,
    },
    require_smoke_event: {
      type: Sequelize.STRING,
    },
    total_required_smoke_vent: {
      type: Sequelize.STRING,
    },
    required_smoke_vent: {
      type: Sequelize.STRING,
    },
    cubic_feet: {
      type: Sequelize.STRING,
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
ProjectSmokeVent.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectSmokeVent;
