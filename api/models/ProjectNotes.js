const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'project_notes';

const projetcNotes = sequelize.define(
  'projetcNotes',
  {
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
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
projetcNotes.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = projetcNotes;
