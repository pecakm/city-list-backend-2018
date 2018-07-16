var express = require('express');
const userQueries = require('../../db/userQueries');
const constants = require('../../helpers/Constants');

var router = express.Router();

router.post('/', function(req, res) {
    let userData = {
        email: req.body.email,
        password: req.body.password
    };

    userQueries.createUser(userData)
    .then(function(status) {
        if (status == 200) {
            sendResponse(res);
        } else {
            sendBadResponse(res);
        }
    }).catch(function(status) {
        sendBadResponse(res);
    })
});

function sendResponse(response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.userRegistered));
}

function sendBadResponse(response) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.error));
}

module.exports = router;