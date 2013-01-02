var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();

app.root = __dirname;

global.host = 'localhost';
global.port = 27017;
global.dbname = "smartreaddb";

require('./server/config')(app, express);
require('./server/router')(app);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
