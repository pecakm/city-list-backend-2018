var assert = require('assert');

const credentialsCheck = require('../modules/credentialsCheck');

describe('User registration', function() {
    describe('Empty query', function() {
        it('should not pass when object is empty', function() {
            assert.equal(false, credentialsCheck.isValid({}));
        });
        it('should not pass when email is null', function() {
            assert.equal(false, credentialsCheck.isValid({
                password: "test"
            }));
        });
        it('should not pass when password is null', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test"
            }));
        });
    });

    describe('Empty strings', function() {
        it('should not pass when object strings are empty', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "",
                password: ""
            }));
        });
        it('should not pass when email string is empty', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "",
                password: "test"
            }));
        });
        it('should not pass when password string is empty', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test",
                password: ""
            }));
        });
    });
});