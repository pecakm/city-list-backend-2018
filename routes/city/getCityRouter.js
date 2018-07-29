var express = require('express');
const cityQueries = require('../../db/cityQueries');
let response = require('../../modules/responseType');

var router = express.Router();

router.get('/all', (req, res) => {
    cityQueries.getAllCities()
    .then((data) => {
        response.sendResponse(res, data);
    }).catch((error) => {
        response.sendBadResponse(res, error);
    });
});

module.exports = router;
