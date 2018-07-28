var jwt = require('jsonwebtoken');

var envVars = require('../env_vars');

let jwtTokens = {};

jwtTokens.signToken = function(userId) {
    let token = jwt.sign({ id: userId }, envVars.SECRET, {
        expiresIn: 86400
    });

    return token;
}

jwtTokens.verifyToken = function(token) {
    let data = jwt.verify(token, envVars.SECRET, function(err, data) {
        if (err) {
            return 500;
        } else {
            return data;
        }
    });

    return data;
}

module.exports = jwtTokens;