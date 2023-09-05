const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'contact_type_mapping';
const ContactTypeMap = sequelize.define(
  'ContactTypeMap',
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
ContactTypeMap.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ContactTypeMap;
