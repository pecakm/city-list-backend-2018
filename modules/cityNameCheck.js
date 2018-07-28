let cityNameCheck = {};

cityNameCheck.isValid = function(cityName) {
    if (cityName == null) {
        return false;
    }

    if (cityName == '') {
        return false;
    }

    if (typeof cityName != 'string') {
        return false;
    }

    if (parseInt(cityName)) {
        return false;
    }

    return true;
}

module.exports = cityNameCheck;