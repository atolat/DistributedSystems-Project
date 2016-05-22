var express = require('express');
var app = express();
var bodyParser= require('body-parser');

var gcm=require('node-gcm');
var routes = require('./routes/routes')(app);
var PORT = process.env.PORT || 3000;


//GCM integration
var message = new gcm.Message();
message.addData('key1', 'msg1');
var regTokens = ['YOUR_REG_TOKEN_HERE'];

// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyDdMT2Y1-0ZFLOTLIhaEPoudYSuz38KRM');

app.use(bodyParser.json());

 app.get('/',function(req, res){
    res.send('API Root');
    });

app.listen(PORT,function(){
console.log('Express listening on port:: '+PORT);

})