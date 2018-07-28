var jwt = require('jsonwebtoken');

var envVars = require('../env_vars');

let jwtTokens = {};

jwtTokens.signToken = function(userId) {
    return jwt.sign({ id: userId }, envVars.SECRET, {
        expiresIn: 86400
    });
}

jwtTokens.verifyToken = function(token) {
    return jwt.verify(token, envVars.SECRET, function(err, data) {
        if (err) {
            return { status: 500, message: err };
        } else {
            return data;
        }
    });
}

module.exports = jwtTokens;