var express = require('express');
const cityQueries = require('../../db/cityQueries');
const userQueries = require('../../db/userQueries');
let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');
let userRoleQueries = require('../../db/userRoleQueries');
let cityNameCheck = require('../../modules/cityNameCheck');

var router = express.Router();

router.post('/add', jwtTokens.verifyToken, (req, res) => {
    userQueries.findUserById(req.userId)
    .then((user) => {
        verifyAdmin(user.role_id, req, res);
    }).catch((err) => {
        response.handleError(err, res);
    });
});

function verifyAdmin(roleId, req, res) {
    userRoleQueries.getAdminRoleId()
    .then((adminId) => {
        if (adminId == roleId) {
            addCity(req.body.name, res);
        } else {
            response.sendForbiddenResponse(res);
        }
    }).catch((err) => {
        response.handleError(err, res);
    });
}

function addCity(name, res) {
    let cityName = name;

    if (cityNameCheck.isValid(cityName)) {
        cityQueries.addCity(cityName)
        .then((city) => {
            response.sendResponse(res, city);
        }).catch((err) => {
            response.sendBadResponse(res, err);
        });
    } else {
        response.sendIncorrectCredentialsResponse(res);
    }
}

module.exports = router;