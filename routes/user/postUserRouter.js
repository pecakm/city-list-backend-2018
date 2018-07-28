var express = require('express');
const userQueries = require('../../db/userQueries');
const credentialsCheck = require('../../modules/credentialsCheck');
let response = require('../../modules/responseType');

var router = express.Router();

router.post('/register', function(req, res) {
    let userData = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
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