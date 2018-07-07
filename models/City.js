const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const City = sequelize.define('city', {
    name: {
        type: Sequelize.STRING
    }
});

module.exports = City;
