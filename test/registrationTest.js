var assert = require('assert');

const credentialsCheck = require('../modules/credentialsCheck');

let userData = {
    email: 'test@test.pl',
    password: 'test123',
    role: 0
};

describe('User registration', function() {
    describe('Correct credentials', function() {
        it('should pass when email, password and role are correct', function() {
            assert.equal(true, credentialsCheck.isValid(userData));
        });
    });
    
    describe('Empty query', function() {
        it('should not pass when object is empty', function() {
            assert.equal(false, credentialsCheck.isValid({}));
        });
        it('should not pass when email is null', function() {
            assert.equal(false, credentialsCheck.isValid({
                password: 'test123',
                role: 0
            }));
        });
        it('should not pass when password is null', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: 'test@test.pl',
                role: 0
            }));
        });
        it('should not pass when role is null', function() {
            assert.equal(false, credentialsCheck.isValid({
                email: 'test@test.pl',
                password: 'test123'
            }));
        });
    });

    describe('Empty strings', function() {
        it('should not pass when email string is empty', function() {
            let data = userData;
            data.email = '';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when password string is empty', function() {
            let data = userData;
            data.password = '';
            assert.equal(false, credentialsCheck.isValid(data));
        });
    });

    describe('Incorrect email address', function() {
        it('should not pass when email address has no dot after @ sign', function() {
            let data = userData;
            data.email = 'test.test@test';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when email address has no @ sign', function() {
            let data = userData;
            data.email = 'test.test';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when email address starts with @ sign', function() {
            let data = userData;
            data.email = '@test.pl';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when email address starts with dot', function() {
            let data = userData;
            data.email = '.test@test.pl';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when email address ends with dot', function() {
            let data = userData;
            data.email = 'test@test.pl.';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when email address ends with @ sign', function() {
            let data = userData;
            data.email = 'test.test@';
            assert.equal(false, credentialsCheck.isValid(data));
        });
    });

    describe('Incorrect password', function() {
        it('should not pass when password is shorter than 6 characters', function() {
            let data = userData;
            data.password = 'test';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when password is longer than 32 characters', function() {
            let data = userData;
            data.password = 'verylongtestpasswordverylongtestpassword'
            assert.equal(false, credentialsCheck.isValid(data));
        });
    });

    describe('Incorrect role', function() {
        it('should not pass when role is empty string', function() {
            let data = userData;
            data.role = '';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when role is not number', function() {
            let data = userData;
            data.role = 'admin';
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when role id is under 0', function() {
            let data = userData;
            data.role = -1;
            assert.equal(false, credentialsCheck.isValid(data));
        });
        it('should not pass when role id is over 1', function() {
            let data = userData;
            data.role = 2;
            assert.equal(false, credentialsCheck.isValid(data));
        });
    });
});