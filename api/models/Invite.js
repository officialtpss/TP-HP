const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const tableName = 'invite';

const Invite = sequelize.define(
  'Invite',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    project_admin_id: {
      type: Sequelize.INTEGER(11),
    },
    token: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    token_expire_time: {
      type: Sequelize.BIGINT,
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName,
  },
);

// eslint-disable-next-line
Invite.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = Invite;
