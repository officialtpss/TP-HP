const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_submital_logs';

const ProjectSubmitalLog = sequelize.define(
  'ProjectSubmitalLog',
  {
    status_on: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    submital_status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    submital_round: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
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
ProjectSubmitalLog.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectSubmitalLog;
