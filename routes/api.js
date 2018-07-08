var express = require('express');
const queries = require('../db/queries');

var router = express.Router();

router.get('/cities', function(req, res) {
    queries.getAllNames()
    .then(function(data) {
        let cities = parseDataToCityNames(data);
        sendResponse(res, cities);
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

module.exports = router;
