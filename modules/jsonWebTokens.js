var jwt = require('jsonwebtoken');
var envVars = require('../env_vars');

const TOKEN_EXP_IN_SECONDS = 86400;

let jwtTokens = {};

jwtTokens.signToken = function(userId) {
    return jwt.sign({ id: userId }, envVars.SECRET, {
        expiresIn: TOKEN_EXP_IN_SECONDS
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