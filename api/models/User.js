const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const sequelize = require('../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define(
  'User',
  {

    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    domain_url: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    agency_name: {
      type: Sequelize.STRING,
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
    zipcode: {
      type: Sequelize.STRING,
    },
    main_phone: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['admin', 'agency', 'project_admin'],
    },
    parent_id: {
      type: Sequelize.INTEGER,
    },
    reset_password_token: {
      type: Sequelize.STRING,
    },
    token_expire_time: {
      type: Sequelize.BIGINT,
    },
    login_first_time: { // use this flag to redirect on change password for invite agency user
      type: Sequelize.ENUM,
      values: ['0', '1'],
      defaultValue: '0',
    },
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'deleted', 'approved', 'reject', 'pending', 'disabled'],
      defaultValue: 'pending',
    },
  },
  { hooks, tableName },
);

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;
