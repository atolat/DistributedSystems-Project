var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());
var routes = require('./routes/scratchpad-server')(app);
var PORT = process.env.PORT || 3000;



app.listen(PORT,function(){
console.log('Express listening on port:: '+PORT);

});