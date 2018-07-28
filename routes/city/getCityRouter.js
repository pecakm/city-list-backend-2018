var express = require('express');
const cityQueries = require('../../db/cityQueries');
let response = require('../../modules/responseType');

var router = express.Router();

router.get('/all', function(req, res) {
    cityQueries.getAllCities()
    .then(function(data) {
        response.sendResponse(res, data);
    }).catch(function(error) {
        response.sendBadResponse(res, error);
    });
});

module.exports = router;
