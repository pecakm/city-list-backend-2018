var express = require('express');
const adminQueries = require('../../db/adminQueries');
const userQueries = require('../../db/userQueries');
let jwtTokens = require('../../modules/jsonWebTokens');
let response = require('../../modules/responseType');
let userRoleQueries = require('../../db/userRoleQueries');

var router = express.Router();

router.post('/add', jwtTokens.verifyToken, function(req, res) {
    userQueries.findUserById(req.userId)
    .then(function(user) {
        verifyAdmin(user.role_id, req, res);
    }).catch(function(err) {
        if (err.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, err);
        }
    });
});

function verifyAdmin(roleId, req, res) {
    userRoleQueries.getAdminRoleId()
    .then(function(adminId) {
        if (adminId == roleId) {
            addCity(req.body.name, res);
        } else {
            response.sendForbiddenResponse(res);
        }
    }).catch(function(err) {
        response.sendBadResponse(res, err);
    });
}

function addCity(name, res) {
    let cityName = name;

    adminQueries.addCity(cityName)
    .then(function(city) {
        response.sendResponse(res, city);
    }).catch(function(err) {
        response.sendBadResponse(res, err);
    });
}

module.exports = router;