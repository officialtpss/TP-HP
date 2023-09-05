const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'contact_type';

const ContactType = sequelize.define(
  'ContactType',
  {
    type: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    // global means acess for all users
    is_global: {
      type: Sequelize.ENUM,
      values: ['yes', 'no'],
      defaultValue: 'no',
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
ContactType.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ContactType;
