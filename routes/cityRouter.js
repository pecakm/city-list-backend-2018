var express = require('express');
const cityQueries = require('../db/cityQueries');
const constants = require('../helpers/Constants');

var router = express.Router();

router.get('/cities', function(req, res) {
    cityQueries.getAllCities()
    .then(function(data) {
        let cities = parseDataToCityNames(data);
        sendResponse(res, cities);
    }).catch(function(error) {
        sendBadResponse(res);
    });
});

function parseDataToCityNames(data) {
    let cityArray = [];
    data.forEach(function(city) {
        cityArray.push(city.dataValues.name);
    });
    return cityArray;
}

function sendResponse(response, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
}

function sendBadResponse(response) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.error));
}

module.exports = router;
