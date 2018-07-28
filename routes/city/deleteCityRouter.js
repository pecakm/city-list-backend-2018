var express = require('express');
const cityQueries = require('../../db/cityQueries');
const userQueries = require('../../db/userQueries');
const userRoleQueries = require('../../db/userRoleQueries');
let response = require('../../modules/responseType');
let jwtTokens = require('../../modules/jsonWebTokens');

var router = express.Router();

router.delete('/delete', jwtTokens.verifyToken, function(req, res) {
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
            deleteCity(req.body.cityId, res);
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

function deleteCity(cityId, res) {
    cityQueries.deleteCity(cityId)
    .then(function(data) {
        response.sendResponse(res, data);
    }).catch(function(error) {
        if (error.status == 404) {
            response.sendNoItemFoundResponse(res);
        } else {
            response.sendBadResponse(res, error);
        }
    });
}

module.exports = router;
