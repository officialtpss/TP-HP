const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const tableName = 'companies';

const Company = sequelize.define(
  'Company',
  {
    company_name: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },

    address: {
      type: Sequelize.STRING,
    },
    suite: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    zip_code: {
      type: Sequelize.STRING,
    },
    main_phone: {
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
Company.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Company;
