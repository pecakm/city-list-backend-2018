let convert = {};

convert.fToC = function(fahrenheit) {
    if(!Number.isInteger(fahrenheit)) return undefined;
    return (fahrenheit - 32) * 5 / 9;
}

module.exports = convert;