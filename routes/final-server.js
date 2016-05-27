module.exports = function (app) {

    var _ = require('underscore');
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    //GCM integration
    var gcm = require('node-gcm');

    //Twilio Integration
    var client = require('twilio')('ACd54cb6f1b8a8bf9d23fe511d24d3459e', '472205f35904bda6943ed88a1343e2b1');




    //API ROOT
    app.get('/', function (req, res) {
        res.send('API Root');
    });



    //FIRST TIME LOGIN
    //url/firstlogin
    app.post('/firstlogin', function (req, res) {
        var body = _.pick(req.body, 'name', 'token', 'num', 'num1', 'num2');
        console.log(body.name);
        var message = new gcm.Message();

        // Add notification payload as key value
        message.addNotification('title', 'Hi!! ' + body.name);
        message.addNotification('body', 'You Have successfully registered for our GCM notification service');
        message.addNotification('icon', 'ic_launcher');

        var sender = new gcm.Sender('AIzaSyDdMT2Y1-OZFLOTLI1haEPoudYSuz38KRM');

        var registrationTokens = [];
        registrationTokens.push(body.token);

        sender.sendNoRetry(message, {
            registrationTokens: registrationTokens
        }, function (err, response) {
            if (err) console.error(err);
            else console.log(response);
        });
        //SEND SMS to USER
        client.sendMessage({

            to: body.num, // Any number Twilio can deliver to
            from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
            body: 'Hi, ' + body.name + ' you have been connected to our service!!' // body of the SMS message

        }, function (err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."

            }
        });
        //SEND SMS to NUM1
        client.sendMessage({

            to: body.num1, // Any number Twilio can deliver to
            from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
            body: 'Hi, ' + body.name + ' has hadded you to our service!!' // body of the SMS message

        }, function (err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."

            }
        });

        //SEND SMS to NUM2
        client.sendMessage({

            to: body.num2, // Any number Twilio can deliver to
            from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
            body: 'Hi, ' + body.name + ' has hadded you to our service!!' // body of the SMS message

        }, function (err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."

            }
        });



        res.json(body);
    });
    
    
    
    //Wifi off
    //url/wifi
    app.post('/wifi', function (req, res) {
        var body = _.pick(req.body, 'name', 'token','num', 'wifi');
       
        
       

        //SEND SMS to USER
        client.sendMessage({

            to: body.num, // Any number Twilio can deliver to
            from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
            body: 'Hi, ' + body.name + ' your wifi signal is low, you will now receive SMS notifications.' // body of the SMS message

        }, function (err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."

            }
        });
        
        
        
            });


    
    
    
    


    
    
    
    
    
    
    
    
    
    
    





    //    
    //    
    //    //Test GCM POST
    //    app.post('/gcm', function (req, res) {
    //            var body = _.pick(req.body, 'user', 'token', 'num');
    //            console.log(body.user);
    //            console.log(body.token);
    //            console.log(body.num);
    //
    //        var message = new gcm.Message();
    //
    //// Add notification payload as key value
    //message.addNotification('title', 'Alert!!!');
    //message.addNotification('body', 'Abnormal data access');
    //message.addNotification('icon', 'ic_launcher');
    //
    //// as object
    //message.addNotification({
    //  title: 'Alert!!!',
    //  body: 'Abnormal data access',
    //  icon: 'ic_launcher'
    //});
    //          var sender = new gcm.Sender('AIzaSyDdMT2Y1-OZFLOTLI1haEPoudYSuz38KRM');  
    //        
    //        var registrationTokens = [];
    //registrationTokens.push('eigiIAk2wUM:APA91bGiJTymPOoqsxp5zqsEv4jj6DJYnRB2qxiwdbiGaoQwcTmDV_eWXPQPLxCxPPAXaOnMhDlyHh1NsObxO6JmGbSuPVm_qXhqOz4LmD-z7gsTQhBKEJfAISAx9qUkJxuZoYMk55NS');
    //
    //        sender.sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
    //  if(err) console.error(err);
    //  else    console.log(response);
    //});
    //
    //
    //
    //            res.json(body);
    //
    //        });




}