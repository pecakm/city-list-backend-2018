City = require('../models/City');

let queries = {};

queries.getAllCities = function() {
    return new Promise(function(resolve, reject) {
        City.find(function(error, cities) {
            if (error) {
                reject(error);
            } else {
                resolve(cities);
            }
        });
    });
}

queries.addCity = function(cityName) {
    return new Promise(function(resolve, reject) {
        saveCity(cityName)
        .then(function(city) {
            resolve(city);
        }).catch(function(error) {
            reject(error);
        });
    });
}

function saveCity(name) {
    const city = new City({
        name: name   
    });

    return new Promise(function(resolve, reject) {
        city.save()
        .then(function(city) {
            resolve(city);
        }).catch(error => {
            reject(error);
        });
    });
}

queries.findCityById = function(id) {
    return new Promise(function(resolve, reject) {
        City.findById(id, function(err, city) {
            if (err) {
                reject({ status: 500, message: err });
            } else if (!city) {
                reject({ status: 404 });
            } else {
                resolve(city._id);
            }
        });
    });
}

module.exports = queries;
