var express = require('express');
const sequelize = require('../db/connection');
const City = require('../models/City');
const queries = require('../db/queries');

var router = express.Router();

router.get('/', function(req, res, next) {
    readCitiesFromDatabase()
    .then(function(cities) {
        res.render('index', { cities: cities });
    });
});

function readCitiesFromDatabase() {
    return new Promise(function(resolve, reject) {
        City.findAll().then(cities => {
            resolve(parseDataToCityNames(cities));
        });
    });
}

function parseDataToCityNames(data) {
    let cityArray = [];
    data.forEach(function(city) {
        cityArray.push(city.dataValues.name);
    });
    return cityArray;
}

module.exports = router;
