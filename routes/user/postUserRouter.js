var express = require('express');
const userQueries = require('../../db/userQueries');
const userRoleQueries = require('../../db/userRoleQueries');
const credentialsCheck = require('../../modules/credentialsCheck');
let response = require('../../modules/responseType');

var router = express.Router();

router.post('/register', function(req, res) {
    userRoleQueries.getSubscriberRoleId()
    .then(function(subscriberRoleId) {
        checkUserData(subscriberRoleId, req, res);
    }).catch(function(err) {
        if (err.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, err);
        }

        console.log('WORK');
        return null;
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
    .then(function(data) {
        response.sendResponse(res, data);
    }).catch(function(error) {
        response.sendBadResponse(res, error);
    });
}

router.post('/login', function(req, res) {
    userQueries.loginUser(req.body.email, req.body.password)
    .then(function(token) {
        response.sendResponse(res, token);
    }).catch(function(err) {
        if (err.status == 500) {
            response.sendBadResponse(res, err.message);
        } else {
            response.sendNoItemFoundResponse(res);
        }
    });
});

module.exports = router;