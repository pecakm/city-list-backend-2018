var express = require('express');
const cityQueries = require('../../db/cityQueries');
let response = require('../../modules/responseType');

var router = express.Router();

router.get('/', function(req, res) {
    cityQueries.getAllCities()
    .then(function(data) {
        response.sendResponse(res, data);
    }).catch(function(error) {
        sendBadResponse(res, error);
    });
});

function sendBadResponse(response, error) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(error));
}

module.exports = router;
