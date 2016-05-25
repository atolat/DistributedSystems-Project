var express = require('express');
var app = express();
var routes = require('./routes/scratchpad-server')(app);
var PORT = process.env.PORT || 3000;

allowCrossDomain = function(req, res, next) {
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



app.listen(PORT,function(){
console.log('Express listening on port:: '+PORT);

});