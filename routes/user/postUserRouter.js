var express = require('express');

const userQueries = require('../../db/userQueries');
const credentialsCheck = require('../../modules/credentialsCheck');
const constants = require('../../helpers/Constants');

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
        sendIncorrectCredentialsResponse(res);
    }
});

function createUser(userData, res) {
    userQueries.createUser(userData)
    .then(function(data) {
        response.sendResponse(res, data);
    }).catch(function(error) {
        sendBadResponse(res, error);
    });
}

function sendBadResponse(response, error) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(error));
}

function sendIncorrectCredentialsResponse(response) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.INCORRECT_CREDENTIALS));
}

module.exports = router;