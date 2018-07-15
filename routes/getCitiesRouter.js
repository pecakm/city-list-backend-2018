var express = require('express');
const cityQueries = require('../db/cityQueries');
const constants = require('../helpers/Constants');

var router = express.Router();

router.get('/', function(req, res) {
    cityQueries.getAllCities()
    .then(function(data) {
        sendResponse(res, data);
    }).catch(function(error) {
        sendBadResponse(res);
    });
});

function sendResponse(response, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
}

function sendBadResponse(response) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.error));
}

module.exports = router;
