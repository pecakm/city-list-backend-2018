let credentialsCheck = {};

credentialsCheck.isValid = function(userData) {
    if (!validateEmail(userData.email)) {
        return false;
    }

    if (!validatePassword(userData.password)) {
        return false;
    }

    if (!validateRole(userData.role)) {
        return false;
    }

    return true;
}

function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function validatePassword(password) {
    if (password == null) {
        return false;
    }

    if (password == '') {
        return false;
    }

    if (password.length < 6) {
        return false;
    }

    if (password.length > 32) {
        return false;
    }

    return true;
}

function validateRole(role) {
    if (role == null) {
        return false;
    }

    if (role < 0) {
        return false;
    }

    if (role > 1) {
        return false;
    }

    return true;
}

module.exports = credentialsCheck;