var express = require('express');
const userQueries = require('../../db/userQueries');
const cityQueries = require('../../db/cityQueries');
const userRoleQueries = require('../../db/userRoleQueries');
let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');

var router = express.Router();

router.get('/', jwtTokens.verifyToken, function(req, res) {
    userQueries.findUserById(req.userId)
    .then(function(user) {
        response.sendResponse(res, user);
    }).catch(function(err) {
        if (err.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, err.message);
        }
    });
});

router.get('/liked-cities', jwtTokens.verifyToken, function(req, res) {
    userQueries.findUserById(req.userId)
    .then(function(user) {
        verifySubscriber(user, res);
    }).catch(function(err) {
        if (err.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, err.message);
        }
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
        if (err.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, err);
        }
    });
}

function createLikedCitiesArray(data, res) {
    let promises = [];
    let citiesArray = [];

    data.forEach(cityId => {
        console.log('HERE');
        promises.push(
            getOneCity(cityId)
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
        console.log('Done');
        response.sendResponse(res, citiesArray);
    });
}

function getOneCity(cityId) {
    return new Promise(function(resolve, reject) {
        cityQueries.findCityById(cityId)
        .then(function(city) {
            resolve(city);
        }).catch(function(err) {
            if (err.status == 404 || err.name == 'CastError') {
                // delete this item
                reject(err);
            } else {
                reject(err);
                //response.sendBadResponse(res, err);
            }
        });
    });
}

module.exports = router;