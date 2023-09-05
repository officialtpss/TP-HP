const sequelize = require('../config/database');

const tableName = 'project_scope_service';

const ProjectScopeService = sequelize.define(
  'ProjectScopeService',
  { },
  {
    tableName,
  },
  {
    underscored: true,
  },
);
// eslint-disable-next-line
ProjectScopeService.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectScopeService;
