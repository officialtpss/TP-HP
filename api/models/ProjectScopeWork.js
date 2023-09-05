const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_scope_work';

const ProjectScopeWork = sequelize.define(
  'ProjectScopeWork',
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
ProjectScopeWork.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectScopeWork;
