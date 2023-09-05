const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const { allProjectStorageConfigTypes } = require('../constants');

const tableName = 'project_storage_config';

const ProjectStorageConfig = sequelize.define(
  'ProjectStorageConfig',
  {
    storage_depth: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('storage_depth') ? JSON.parse(this.getDataValue('storage_depth')) : '';
      },
      set(value) {
        return this.setDataValue('storage_depth', JSON.stringify(value));
      },
    },
    allowable_options: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('allowable_options') ? JSON.parse(this.getDataValue('allowable_options')) : '';
      },
      set(value) {
        return this.setDataValue('allowable_options', JSON.stringify(value));
      },
    },
    fuel_space_less_25: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('fuel_space_less_25') ? JSON.parse(this.getDataValue('fuel_space_less_25')) : '';
      },
      set(value) {
        return this.setDataValue('fuel_space_less_25', JSON.stringify(value));
      },
    },
    fuel_space_greater_25: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('fuel_space_greater_25') ? JSON.parse(this.getDataValue('fuel_space_greater_25')) : '';
      },
      set(value) {
        return this.setDataValue('fuel_space_greater_25', JSON.stringify(value));
      },
    },

    fmds_fuel_space: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('fmds_fuel_space') ? JSON.parse(this.getDataValue('fmds_fuel_space')) : '';
      },
      set(value) {
        return this.setDataValue('fmds_fuel_space', JSON.stringify(value));
      },
    },
    fuel_space_enforcement: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('fuel_space_enforcement') ? JSON.parse(this.getDataValue('fuel_space_enforcement')) : '';
      },
      set(value) {
        return this.setDataValue('fuel_space_enforcement', JSON.stringify(value));
      },
    },
    load_limitation: {
      type: Sequelize.TEXT,
      get() {
        return this.getDataValue('load_limitation') ? JSON.parse(this.getDataValue('load_limitation')) : '';
      },
      set(value) {
        return this.setDataValue('load_limitation', JSON.stringify(value));
      },
    },
    label: {
      type: Sequelize.STRING,
    },
    allowable_storage_height: {
      type: Sequelize.TEXT,
    },
    proposed_storage_height: {
      type: Sequelize.TEXT,
    },
    configure_storage_rack: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.ENUM,
      values: allProjectStorageConfigTypes,
      defaultValue: 'Storage Rack',
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
ProjectStorageConfig.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectStorageConfig;
