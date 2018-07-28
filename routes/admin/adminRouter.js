var express = require('express');

const adminQueries = require('../../db/adminQueries');

let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');

var router = express.Router();

router.post('/add', jwtTokens.verifyToken, function(req, res) {
    let cityName = req.body.name;
    
    adminQueries.addCity(cityName)
    .then(function(city) {
        response.sendResponse(res, city);
    }).catch(function(err) {
        response.sendBadResponse(res, err);
    });
});

module.exports = router;