let credentialsCheck = {};

credentialsCheck.isValid = function(userData) {
    if (userData.email == null) {
        return false;
    }

    if (userData.password == null) {
        return false;
    }

    if (userData.email == "") {
        return false;
    }

    if (userData.password == "") {
        return false;
    } 

    return true;
}

module.exports = credentialsCheck;