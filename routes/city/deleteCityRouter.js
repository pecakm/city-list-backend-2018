var express = require('express');
const cityQueries = require('../../db/cityQueries');
const userQueries = require('../../db/userQueries');
const userRoleQueries = require('../../db/userRoleQueries');
let response = require('../../modules/responseType');
let jwtTokens = require('../../modules/jsonWebTokens');

var router = express.Router();

router.delete('/delete', jwtTokens.verifyToken, (req, res) => {
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
            deleteCity(req.body.cityId, res);
        } else {
            response.sendForbiddenResponse(res);
        }
    }).catch((err) => {
        response.handleError(err, res);
    });
}

function deleteCity(cityId, res) {
    cityQueries.deleteCity(cityId)
    .then((data) => {
        response.sendResponse(res, data);
    }).catch((err) => {
        response.handleError(err, res);
    });
}

module.exports = router;
