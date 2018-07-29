City = require('../models/City');

let queries = {};

queries.getAllCities = () => {
    return new Promise((resolve, reject) => {
        City.find((error, cities) => {
            if (error) {
                reject(error);
            } else {
                resolve(cities);
            }
        });
    });
}

queries.findCityById = (id) => {
    return new Promise((resolve, reject) => {
        City.findById(id, (err, city) => {
            if (err) {
                reject({ status: 500, message: err });
            } else if (!city) {
                reject({ status: 404 });
            } else {
                resolve(city);
            }
        });
    });
}

queries.addCity = (cityName) => {
    return new Promise((resolve, reject) => {
        saveCity(cityName)
        .then((city) => {
            resolve(city);
        }).catch((error) => {
            reject(error);
        });
    });
}

function saveCity(name) {
    const city = new City({
        name: name   
    });

    return new Promise((resolve, reject) => {
        city.save()
        .then((city) => {
            resolve(city);
        }).catch(error => {
            reject(error);
        });
    });
}

queries.deleteCity = (id) => {
    return new Promise((resolve, reject) => {
        City.remove({ _id: id }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.n == 0) {
                    reject({ status: 404 });
                } else {
                    resolve(result);
                }
            }
        });
    })
}

module.exports = queries;
