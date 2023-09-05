const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_sprinkler';

const ProjectSprinkler = sequelize.define(
  'ProjectSprinkler',
  {
    area: {
      type: Sequelize.STRING,
    },
    low_ceiling: {
      type: Sequelize.STRING,
    },
    high_ceiling: {
      type: Sequelize.STRING,
    },
    design_type: {
      type: Sequelize.STRING,
    },
    k_factor: {
      type: Sequelize.STRING,
    },
    head_temperature: {
      type: Sequelize.STRING,
    },
    design_area: {
      type: Sequelize.STRING,
    },
    head_orientation: {
      type: Sequelize.STRING,
    },
    system: {
      type: Sequelize.STRING,
    },
    heads: {
      type: Sequelize.STRING,
    },
    operating_pressure: {
      type: Sequelize.STRING,
    },
    ambient_temperature: {
      type: Sequelize.STRING,
    },
    smoke: {
      type: Sequelize.STRING,
    },
    catwalk: {
      type: Sequelize.STRING,
    },
    recalc: {
      type: Sequelize.STRING,
    },
    copy_sprinkler_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    is_roof_pitch_greater: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
ProjectSprinkler.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectSprinkler;
