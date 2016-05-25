var express = require('express');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var app = express();
var routes = require('./routes/scratchpad-server')(app);
var PORT = process.env.PORT || 3000;
var db;


allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);


//Connect to remote DB
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log("Database connection ready");

    app.listen(PORT, function () {
        console.log('Express listening on port:: ' + PORT);

    });
});