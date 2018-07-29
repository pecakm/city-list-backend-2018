var express = require('express');
const userQueries = require('../../db/userQueries');
const userRoleQueries = require('../../db/userRoleQueries');
const credentialsCheck = require('../../modules/credentialsCheck');
let response = require('../../modules/responseType');

var router = express.Router();

router.post('/register', (req, res) => {
    userRoleQueries.getSubscriberRoleId()
    .then((subscriberRoleId) => {
        checkUserData(subscriberRoleId, req, res);
    }).catch((err) => {
        response.handleError(err, res);
    });
});

function checkUserData(subscriberRoleId, req, res) {
    let userData = {
        email: req.body.email,
        password: req.body.password,
        role: subscriberRoleId
    };

    if (credentialsCheck.isValid(userData)) {
        createUser(userData, res);
    } else {
        response.sendIncorrectCredentialsResponse(res);
    }
}

function createUser(userData, res) {
    userQueries.createUser(userData)
    .then((data) => {
        response.sendResponse(res, data);
    }).catch((error) => {
        response.sendBadResponse(res, error);
    });
}

router.post('/login', (req, res) => {
    userQueries.loginUser(req.body.email, req.body.password)
    .then((token) => {
        response.sendResponse(res, token);
    }).catch((err) => {
        response.handleError(err, res);
    });
});

module.exports = router;