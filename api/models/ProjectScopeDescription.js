const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_scope_description';

const ProjectScopeDescription = sequelize.define(
  'ProjectScopeDescription',
  {
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    new: {
      type: Sequelize.STRING,
    },
    existing: {
      type: Sequelize.STRING,
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
ProjectScopeDescription.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectScopeDescription;
