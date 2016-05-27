module.exports = function (app){
    
     var _ = require('underscore');
        var bodyParser = require('body-parser');
        app.use(bodyParser.json());

        //GCM integration
        var gcm = require('node-gcm');
        
        
    
    
    //API ROOT
        app.get('/', function (req, res) {
            res.send('API Root');
        });
    
    //Test GCM POST
    app.post('/gcm', function (req, res) {
            var body = _.pick(req.body, 'user', 'token', 'num');
            console.log(body.user);
            console.log(body.token);
            console.log(body.num);

        var message = new gcm.Message({
    collapseKey: 'demo',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
    restrictedPackageName: "somePackageName",
    dryRun: true,
    data: {
        key1: 'message1',
        key2: 'message2'
    },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed ASAP."
    }
});
          var sender = new gcm.Sender('AIzaSyDdMT2Y1-OZFLOTLI1haEPoudYSuz38KRM');  
        
        var registrationTokens = [];
registrationTokens.push('eigiIAk2wUM:APA91bGiJTymPOoqsxp5zqsEv4jj6DJYnRB2qxiwdbiGaoQwcTmDV_eWXPQPLxCxPPAXaOnMhDlyHh1NsObxO6JmGbSuPVm_qXhqOz4LmD-z7gsTQhBKEJfAISAx9qUkJxuZoYMk55NS');

        sender.sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
  if(err) console.error(err);
  else    console.log(response);
});



            res.json(body);

        });

    
    
    
}