var assert = require('assert');
const cityNameCheck = require('../modules/cityNameCheck');

let cityName = 'Koszalin';

describe('City adding', function() {
    describe('Correct name', function() {
        it('should pass when city name is correct', function() {
            assert.equal(true, cityNameCheck.isValid(cityName));
        });
    });

    describe('Incorrect name', function() {
        it('should not pass when city name is empty', function() {
            assert.equal(false, cityNameCheck.isValid({}));
        });
        it('should not pass when city name string is empty', function() {
            let name = cityName;
            name = '';
            assert.equal(false, cityNameCheck.isValid(name));
        });
        it('should not pass when city name is not string', function() {
            assert.equal(false, cityNameCheck.isValid(17));
        });
    });
});