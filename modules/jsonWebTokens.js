var jwt = require('jsonwebtoken');
var envVars = require('../env_vars');
let response = require('../modules/responseType');

const TOKEN_EXP_IN_SECONDS = 86400;

let jwtTokens = {};

jwtTokens.signToken = (userId) => {
    return jwt.sign({ id: userId }, envVars.SECRET, {
        expiresIn: TOKEN_EXP_IN_SECONDS
    });
}

jwtTokens.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        response.sendNoTokenResponse(res);
    } else {
        return jwt.verify(token, envVars.SECRET, (err, data) => {
            if (err) {
                response.sendBadResponse(res, err);
            } else {
                req.userId = data.id;
                next();
            }
        });
    }
}

module.exports = jwtTokens;