const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'contacts';
const Contact = sequelize.define(
  'Contact',
  {
    contact_name: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
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
Contact.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Contact;
