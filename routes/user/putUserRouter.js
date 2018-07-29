var express = require('express');
const cityQueries = require('../../db/cityQueries');
const userQueries = require('../../db/userQueries');
let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');
let userRoleQueries = require('../../db/userRoleQueries');

var router = express.Router();

router.put('/like', jwtTokens.verifyToken, (req, res) => {
    userQueries.findUserById(req.userId)
    .then((user) => {
        verifySubscriber(user, req, res, true);
    }).catch((err) => {
        response.handleError(err, res);
    });
});

router.put('/unlike', jwtTokens.verifyToken, (req, res) => {
    userQueries.findUserById(req.userId)
    .then((user) => {
        verifySubscriber(user, req, res, false);
    }).catch((err) => {
        response.handleError(err, res);
    });
});

function verifySubscriber(user, req, res, userWantLike) {
    userRoleQueries.getSubscriberRoleId()
    .then((subscriberId) => {
        if (subscriberId == user.role_id) {
            if (userWantLike) {
                verifyCity(user._id, req.body.cityId, res);
            } else {
                unlikeCity(user._id, req.body.cityId, res);
            }
        } else {
            response.sendForbiddenResponse(res);
        }
    }).catch((err) => {
        response.handleError(err, res);
    });
}

function verifyCity(userId, cityId, res) {
    cityQueries.findCityById(cityId)
    .then((city) => {
        likeCity(userId, city._id, res);
    }).catch((err) => {
        response.handleError(err, res);
    });
}

function likeCity(userId, cityId, res) {
    userQueries.likeCity(userId, cityId)
    .then((data) => {
        response.sendResponse(res, data);
    }).catch((err) => {
        response.sendBadResponse(res, err);
    });
}

function unlikeCity(userId, cityId, res) {
    userQueries.unlikeCity(userId, cityId)
    .then((data) => {
        response.sendResponse(res, data);
    }).catch((err) => {
        response.sendBadResponse(res, err);
    });
}

module.exports = router;