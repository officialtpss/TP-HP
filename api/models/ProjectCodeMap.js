const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_code_map';
const ProjectContactMap = sequelize.define(
  'ProjectCodeMap',
  {
    selected_year: {
      type: Sequelize.INTEGER,
      defaultValue: null,
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
ProjectContactMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectContactMap;
