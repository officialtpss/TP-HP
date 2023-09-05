const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_scope_building';

const ProjectScopeBuilding = sequelize.define(
  'ProjectScopeBuilding',
  {
    value: {
      type: Sequelize.STRING,
      allowNull: false,
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
ProjectScopeBuilding.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectScopeBuilding;
