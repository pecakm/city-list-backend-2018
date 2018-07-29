const constants = require('../helpers/Constants');

let response = {};

response.sendResponse = function(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

response.sendIncorrectCredentialsResponse = function(res) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(constants.INCORRECT_CREDENTIALS));
}

response.sendNoTokenResponse = function(res) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(constants.NO_TOKEN_PROVIDED));
}

response.sendForbiddenResponse = function(res) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(constants.NO_ALLOW));
}

response.sendNoItemFoundResponse = function(res) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(constants.NO_ITEM_FOUND));
}

response.sendBadResponse = function(res, message) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
}

response.handleError = function(err, res) {
    if (err.status == 404) {
        this.sendNoItemFoundResponse(res);
    } else {
        this.sendBadResponse(res, err);
    }
}

module.exports = response;