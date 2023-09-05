const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project';

const Project = sequelize.define(
  'Project',
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    designation: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    suite: {
      type: Sequelize.STRING,
    },
    zip_code: {
      type: Sequelize.STRING,
    },
    agency_project_number: {
      type: Sequelize.STRING,
    },
    construction_type: {
      type: Sequelize.STRING,
    },
    all_access: {
      type: Sequelize.ENUM,
      values: ['true', 'false'],
      defaultValue: 'false',
    },
    building: {
      type: Sequelize.ENUM,
      values: ['existing', 'new'],
      defaultValue: 'existing',
    },
    scope_output: {
      type: Sequelize.TEXT,
    },
    tags: {
      type: Sequelize.TEXT,
      defaultValue: '[]',
      get() {
        return this.getDataValue('tags') ? JSON.parse(this.getDataValue('tags')) : '';
      },
      set(value) {
        return this.setDataValue('tags', JSON.stringify(value));
      },
    },
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'archive', 'deleted'],
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
Project.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Project;
