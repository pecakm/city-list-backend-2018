var assert = require('assert');

const credentialsCheck = require('../modules/credentialsCheck');

describe('User registration', function() {
    describe('Empty query', function() {
        it('should not pass when object is empty', function() {
            assert.equal(false, credentialsCheck.isValid({}));
        });
        it('should not pass when email is null', function() {
            assert.equal(false, credentialsCheck.isValid({
                password: "test123"
            }));
        });
        it('should not pass when password is null', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test@test.pl"
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
                password: "test123"
            }));
        });
        it('should not pass when password string is empty', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test@test.pl",
                password: ""
            }));
        });
    });

    describe('Incorrect email address', function() {
        it('should not pass when email address has no dot after @ sign', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test.test@test",
                password: "test123"
            }));
        });
        it('should not pass when email address has no @ sign', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test.test",
                password: "test123"
            }));
        });
        it('should not pass when email address starts with @ sign', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "@test.pl",
                password: "test123"
            }));
        });
        it('should not pass when email address starts with dot', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: ".test@test.pl",
                password: "test123"
            }));
        });
        it('should not pass when email address ends with dot', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test@test.pl.",
                password: "test123"
            }));
        });
        it('should not pass when email address ends with @ sign', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test.test@",
                password: "test123"
            }));
        });
    });

    describe('Incorrect password', function() {
        it('should not pass when password is shorter than 6 characters', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test@test.pl",
                password: "test"
            }));
        });
        it('should not pass when password is longer than 32 characters', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: "test@test.pl",
                password: "verylongtestpasswordverylongtestpassword"
            }));
        });
    });

    describe('Correct credentials', function() {
        it('should pass when email and password are correct', function() {
            assert.equal(true, credentialsCheck.isValid({
                email: "test@test.pl",
                password: "test123"
            }));
        });
    });
});