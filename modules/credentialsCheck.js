let credentialsCheck = {};

credentialsCheck.isValid = function(userData) {
    if (!validateEmail(userData.email)) {
        return false;
    }

    if (userData.password == null) {
        return false;
    }

    if (userData.password == "") {
        return false;
    }

    if (userData.password.length < 6) {
        return false;
    }

    if (userData.password.length > 32) {
        return false;
    }

    return true;
}

function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

module.exports = credentialsCheck;