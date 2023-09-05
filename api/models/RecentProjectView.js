const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'recent_project_view';

const RecentProjectView = sequelize.define(
  'RecentProjectView',
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
RecentProjectView.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = RecentProjectView;
