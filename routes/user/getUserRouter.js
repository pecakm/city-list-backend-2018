var express = require('express');

const userQueries = require('../../db/userQueries');
const constants = require('../../helpers/Constants');

let jwtTokens = require('../../modules/jsonWebTokens');

var router = express.Router();

router.get('/', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) {
        sendNoTokenResponse(res);
    } else {
        let data = jwtTokens.verifyToken(token);

        if (data == 500) {
            sendTokenAuthFailResponse(res);
        } else {
            userQueries.findUser(data.id)
            .then(function(user) {
                sendResponse(res, user);
            }).catch(function(err) {
                if (err == 404) {
                    sendNoUserFoundResponse(res);
                } else {
                    sendBadResponse(res);
                }
            });
        }
    }
});

function sendNoTokenResponse(response) {
    let data = {
        auth: false,
        message: 'No token provided.'
    };
    response.writeHead(401, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
}

function sendResponse(response, data) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
}

function sendTokenAuthFailResponse(response) {
    let data = {
        auth: false,
        message: 'Failed to authenticate token.'
    };
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
}

function sendNoUserFoundResponse(response) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.noUserFound));
}

function sendBadResponse(response) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.error));
}

module.exports = router;