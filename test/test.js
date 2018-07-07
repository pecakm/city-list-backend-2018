var assert = require('assert');
var converter = require('../routes/convert');

describe('Temperature Conversion', function() {
    describe('fToC', function() {
        it('should convert -40 fahrenheit to -40 celsius', function() {
            assert.equal(-40, converter.fToC(-40));
        });
        it('should convert 32 fahrenheit to 0 celsius', function() {
            assert.equal(0, converter.fToC(32));
        });
        it('should return undefined if no temperature is input', function(){
            assert.equal(undefined, converter.fToC(''));
        });
    });
});
