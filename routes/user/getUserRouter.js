var express = require('express');
const userQueries = require('../../db/userQueries');
const cityQueries = require('../../db/cityQueries');
const userRoleQueries = require('../../db/userRoleQueries');
let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');

var router = express.Router();

router.get('/liked-cities', jwtTokens.verifyToken, (req, res) => {
    userQueries.findUserById(req.userId)
    .then((user) => {
        verifySubscriber(user, res);
    }).catch((err) => {
        response.handleError(err, res);
    });
});

function verifySubscriber(user, res) {
    userRoleQueries.getSubscriberRoleId()
    .then((subscriberId) => {
        if (subscriberId == user.role_id) {
            createLikedCitiesArray(user, res);
        } else {
            response.sendForbiddenResponse(res);
        }
    }).catch((err) => {
        response.handleError(err, res);
    });
}

function createLikedCitiesArray(user, res) {
    let promises = [];
    let citiesArray = [];
    user.liked_cities.forEach(cityId => {
        promises.push(
            getCityPromise(cityId)
            .then((city) => {
                citiesArray.push(city);
            }).catch((err) => {
                if (err.status == 404 || err.message.name == 'CastError') {
                    userQueries.deleteNotExistingCity(user._id, cityId);
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
        .then((city) => {
            resolve(city);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = router;