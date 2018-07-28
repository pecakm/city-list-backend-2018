let response = {};

response.sendResponse = function(res, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

module.exports = response;