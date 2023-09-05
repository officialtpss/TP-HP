const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_submital';

const ProjectSubmital = sequelize.define(
  'ProjectSubmital',
  {
    file_name: {
      type: Sequelize.STRING,
      unique: false,
    },
    file_path: {
      type: Sequelize.STRING,
      unique: false,
    },
    fee: {
      type: Sequelize.STRING,
      unique: false,
    },
    paid_on: {
      type: Sequelize.DATE,
      unique: false,
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
ProjectSubmital.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectSubmital;
