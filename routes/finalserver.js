    module.exports = function (app) {

    var _ = require('underscore');
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    var mongoose = require('mongoose');

    //var triggerModel = require('./models/user');

    //GCM integration
    var gcm = require('node-gcm');
    var sender = new gcm.Sender('AIzaSyDdMT2Y1-OZFLOTLI1haEPoudYSuz38KRM');

    //Twilio Integration
    var client = require('twilio')('ACd54cb6f1b8a8bf9d23fe511d24d3459e', '472205f35904bda6943ed88a1343e2b1');
    //var client1 = require('twilio')('ACd54cb6f1b8a8bf9d23fe511d24d3459e', '472205f35904bda6943ed88a1343e2b1');

    //variable to maintain state of wifi
    var wifi = true;



    //Define DB Schemas
    //User Schema
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
    
    name: String,
    token: String,
    num: String,
    num1: String,
    num2: String,
    sensorID: String

    });
    var User = mongoose.model('User',userSchema);
    
    //Trigger Schema    
    var triggerSchema = mongoose.Schema({
    
    sensorID: String,
    triggerID: String,
    message: String,
    num1: String,
    num2: String 
    
    });

    var Trigger = mongoose.model('Trigger',triggerSchema);


    //API ROOT
    app.get('/', function (req, res) {
        res.send('API Root');
    });



    //FIRST TIME LOGIN
    //url/firstlogin
    app.post('/firstlogin', function (req, res) {
        var body = _.pick(req.body, 'name', 'token', 'num', 'num1', 'num2', 'sensorID');
        console.log(body.name);

        //Add user to DB
        var user = new User({
            name: body.name,
            token: body.token,
            num: body.num,
            num1: body.num1,
            num2: body.num2,
            sensorID: body.sensorID
        });

        user.save(function(err){
            if(err) throw err;

            console.log('New user successfully saved');
        });


       var message = new gcm.Message();

        // Add notification payload as key value
       message.addNotification({
  title: 'Alert!!!',
  body: 'HELLO!!',
  icon: 'ic_launcher'
});


        

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
            body: 'Hi, ' + body.name + ' has added you to our service!!' // body of the SMS message

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
            body: 'Hi, ' + body.name + ' has added you to our service!!' // body of the SMS message

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


    //WIFI
    //url/sms
    app.post('/sms', function (req, res) {
        var body = _.pick(req.body, 'name', 'token', 'num', 'wifi');
        console.log(body.name);
        console.log(body.wifi);
        wifi=body.wifi;
        if(body.wifi==false){
        //SEND SMS to USER
        client.sendMessage({

            to: body.num, // Any number Twilio can deliver to
            from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
            body: 'Hi, ' + body.name + ', Low WIFI, you will now receive sms notifications.' // body of the SMS message

        }, function (err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."

            }
        });
        }

        res.json(body);
    });


        //SENSOR POSTS
        //url/sensor
        app.post('/sensor', function (req, res) {
            var body = _.pick(req.body, 'sensorID','triggerID');  
            
            console.log(body.sensorID);
            console.log(body.triggerID);
                        
            User.findOne({sensorID: body.sensorID}, 
            function(err,user){
                if(err) console.log(err)
                console.log(user);
            });
            
            //Logic to find message to send to user from DB
            //..
            //..
            
        






    });
    }
                 