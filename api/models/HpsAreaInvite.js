const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const tableName = 'hps_area_invite';

const HpsAreaInvite = sequelize.define(
  'HpsAreaInvite',
  {
    email: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    code: {
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
HpsAreaInvite.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = HpsAreaInvite;
