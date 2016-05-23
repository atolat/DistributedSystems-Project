var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var routes = require('./routes/scratchpad-server')(app);
var PORT = process.env.PORT || 3000;

//Establish DB connection
//mongoose.connect('mongodb://localhost/node-gcm');



// Set up the sender with you API key
//var sender = new gcm.Sender('AIzaSyDdMT2Y1-0ZFLOTLIhaEPoudYSuz38KRM');

app.use(bodyParser.json());

 app.get('/',function(req, res){
    res.send('API Root');
    });



////Mongo Scratchpad
//var User = require('./models/user');
//
//var arpan=new User({
//    username: 'Arpan',
//    password: 'letmein'
//});
//
//arpan.save(function(err){
//    if(err) throw err;
//    
//    console.log('User saved!');
//});
//
//
//User.find({}, function(err, users){
//    if(err) throw err;
//    
//    console.log(users);
//});



app.listen(PORT,function(){
console.log('Express listening on port:: '+PORT);

})