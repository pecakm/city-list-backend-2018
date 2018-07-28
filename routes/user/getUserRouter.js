var express = require('express');

const userQueries = require('../../db/userQueries');

let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');

var router = express.Router();

router.get('/', function(req, res) {
    let token = req.headers['x-access-token'];

    if (!token) {
        response.sendNoTokenResponse(res);
    } else {
        let data = jwtTokens.verifyToken(token);

        if (data.status == 500) {
            response.sendBadResponse(res, data.message);
        } else {
            userQueries.findUser(data.id)
            .then(function(user) {
                response.sendResponse(res, user);
            }).catch(function(err) {
                if (err.status == 404) {
                    response.sendNoUserFoundResponse(res);
                } else {
                    response.sendBadResponse(res, err.message);
                }
            });
        }
    }
});

module.exports = router;