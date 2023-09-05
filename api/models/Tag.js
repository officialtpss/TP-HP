const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const tableName = 'tag';
const Tag = sequelize.define(
    'Tag',
    {
        name: {
            type: Sequelize.STRING,
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
Tag.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Tag;
