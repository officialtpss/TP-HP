const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'imported_project_commodity';
const ImportedProjectCommodity = sequelize.define(
  'ImportedProjectCommodity',
  {
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
ImportedProjectCommodity.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ImportedProjectCommodity;
