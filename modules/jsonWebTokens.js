var jwt = require('jsonwebtoken');

var envVars = require('../env_vars');

let jwtTokens = {};

jwtTokens.signToken = function(userId) {
    let token = jwt.sign({ id: userId }, envVars.secret, {
        expiresIn: 86400
    });

    return token;
}

jwtTokens.verifyToken = function(token) {
    let data = jwt.verify(token, envVars.secret, function(err, decoded) {
        if (err) {
            return 500;
        } else {
            return decoded;
        }
    });

    return data;
}

module.exports = jwtTokens;