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

queries.getCityById = function(id) {
    return new Promise(function(resolve, reject) {
        City.findById(id, function(err, city) {
            if (err) {
                reject(err);
            } else {
                if (city == null) {
                    reject({ status: 404 });
                } else {
                    resolve(city);
                }
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

queries.deleteCity = function(id) {
    return new Promise(function(resolve, reject) {
        City.remove({ _id: id }, function(err, data) {
            if (err) {
                reject(err);
            } else {
                if (data.n == 0) {
                    reject({ status: 404 });
                } else {
                    resolve(data);
                }
            }
        });
    })
}

module.exports = queries;
