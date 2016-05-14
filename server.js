var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000; //app will run on localhost port 3000 or default PORT assigned by heroku

app.get('/', function(req, res){
    res.send('API ROOT');
});

app.listen(PORT, function(){
    console.log('Express listening on port ' +PORT);
});
