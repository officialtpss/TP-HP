const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_contact_map';
const ProjectContactMap = sequelize.define(
  'ProjectContactMap',
  {
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'deleted'],
      defaultValue: 'active',
    }
  },
  {
    tableName,
  },
  {
    underscored: true,
  },
);
// eslint-disable-next-line
ProjectContactMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectContactMap;
