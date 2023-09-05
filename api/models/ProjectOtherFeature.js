const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_other_feature';

const ProjectOtherFeature = sequelize.define(
  'ProjectOtherFeature',
  {
    pallet_analysis: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('pallet_analysis') ? JSON.parse(this.getDataValue('pallet_analysis')) : '';
      },
      set(value) {
        return this.setDataValue('pallet_analysis', JSON.stringify(value));
      },
    },
    batterry_charging_analysis: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('batterry_charging_analysis') ? JSON.parse(this.getDataValue('batterry_charging_analysis')) : '';
      },
      set(value) {
        return this.setDataValue('batterry_charging_analysis', JSON.stringify(value));
      },
    },
    lpg_tank_analysis: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('lpg_tank_analysis') ? JSON.parse(this.getDataValue('lpg_tank_analysis')) : '';
      },
      set(value) {
        return this.setDataValue('lpg_tank_analysis', JSON.stringify(value));
      },
    },
    steel_building_analysis: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('steel_building_analysis') ? JSON.parse(this.getDataValue('steel_building_analysis')) : '';
      },
      set(value) {
        return this.setDataValue('steel_building_analysis', JSON.stringify(value));
      },
    },

    hvls_fan_analysis: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('hvls_fan_analysis') ? JSON.parse(this.getDataValue('hvls_fan_analysis')) : '';
      },
      set(value) {
        return this.setDataValue('hvls_fan_analysis', JSON.stringify(value));
      },
    },
    photovolatic_roof_analysis: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('photovolatic_roof_analysis') ? JSON.parse(this.getDataValue('photovolatic_roof_analysis')) : '';
      },
      set(value) {
        return this.setDataValue('photovolatic_roof_analysis', JSON.stringify(value));
      },
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
ProjectOtherFeature.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectOtherFeature;
