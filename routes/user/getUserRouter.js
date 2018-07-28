var express = require('express');

const userQueries = require('../../db/userQueries');
const constants = require('../../helpers/Constants');

let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');

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
                response.sendResponse(res, data);
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
    response.writeHead(401, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.NO_TOKEN_PROVIDED));
}

function sendTokenAuthFailResponse(response) {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(constants.TOKEN_AUTH_FAIL));
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