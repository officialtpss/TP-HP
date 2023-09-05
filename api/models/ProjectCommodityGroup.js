const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_commodity_group';

const ProjectCommodityGroup = sequelize.define(
  'ProjectCommodityGroup',
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
ProjectCommodityGroup.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ProjectCommodityGroup;
