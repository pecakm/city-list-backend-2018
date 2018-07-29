var express = require('express');
const cityQueries = require('../../db/cityQueries');
const userQueries = require('../../db/userQueries');
let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');
let userRoleQueries = require('../../db/userRoleQueries');

var router = express.Router();

router.put('/like', jwtTokens.verifyToken, function(req, res) {
    userQueries.findUserById(req.userId)
    .then(function(user) {
        verifySubscriber(user, req, res);
    }).catch(function(err) {
        if (err.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, err);
        }
    });
});

function verifySubscriber(user, req, res) {
    userRoleQueries.getSubscriberRoleId()
    .then(function(subscriberId) {
        if (subscriberId == user.role_id) {
            verifyCity(user._id, req.body.cityId, res);
        } else {
            response.sendForbiddenResponse(res);
        }
    }).catch(function(err) {
        if (err.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, err);
        }
    });
}

function verifyCity(userId, cityId, res) {
    cityQueries.findCityById(cityId)
    .then(function(city) {
        likeCity(userId, city._id, res);
    }).catch(function(err) {
        if (err.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, err.message);
        }
    });
}

function likeCity(userId, cityId, res) {
    userQueries.likeCity(userId, cityId)
    .then(function(data) {
        response.sendResponse(res, data);
    }).catch(function(err) {
        response.sendBadResponse(res, err);
    });
}

module.exports = router;