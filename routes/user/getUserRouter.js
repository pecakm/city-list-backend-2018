var express = require('express');
const userQueries = require('../../db/userQueries');
const cityQueries = require('../../db/cityQueries');
const userRoleQueries = require('../../db/userRoleQueries');
let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');

var router = express.Router();

router.get('/liked-cities', jwtTokens.verifyToken, function(req, res) {
    userQueries.findUserById(req.userId)
    .then(function(user) {
        verifySubscriber(user, res);
    }).catch(function(err) {
        response.handleError(err, res);
    });
});

function verifySubscriber(user, res) {
    userRoleQueries.getSubscriberRoleId()
    .then(function(subscriberId) {
        if (subscriberId == user.role_id) {
            createLikedCitiesArray(user.liked_cities, res);
        } else {
            response.sendForbiddenResponse(res);
        }
    }).catch(function(err) {
        response.handleError(err, res);
    });
}

function createLikedCitiesArray(data, res) {
    let promises = [];
    let citiesArray = [];

    data.forEach(cityId => {
        promises.push(
            getCityPromise(cityId)
            .then(function(city) {
                citiesArray.push(city);
            }).catch(function(err) {
                if (err.status == 404 || err.name == 'CastError') {
                    // delete this item
                } else {
                    response.sendBadResponse(res, err);
                }
            })
        );
    });

    Promise.all(promises)
    .then(() => {
        response.sendResponse(res, citiesArray);
    });
}

function getCityPromise(cityId) {
    return new Promise(function(resolve, reject) {
        cityQueries.findCityById(cityId)
        .then(function(city) {
            resolve(city);
        }).catch(function(err) {
            reject(err);
        });
    });
}

module.exports = router;