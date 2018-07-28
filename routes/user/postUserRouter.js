var express = require('express');

const userQueries = require('../../db/userQueries');
const credentialsCheck = require('../../modules/credentialsCheck');

let response = require('../../modules/responseType');

var router = express.Router();

router.post('/', function(req, res) {
    let userData = {
        email: req.body.email,
        password: req.body.password
    };

    if (credentialsCheck.isValid(userData)) {
        createUser(userData, res);
    } else {
        response.sendIncorrectCredentialsResponse(res);
    }
});

function createUser(userData, res) {
    userQueries.createUser(userData)
    .then(function(data) {
        response.sendResponse(res, data);
    }).catch(function(error) {
        response.sendBadResponse(res, error);
    });
}

module.exports = router;