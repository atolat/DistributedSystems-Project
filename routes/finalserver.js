    module.exports = function (app) {

    var _ = require('underscore');
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    var o2x = require('object-to-xml');
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
    message: String
        
    });

    var Trigger = mongoose.model('Trigger',triggerSchema);
    


    //API ROOT
    app.get('/', function (req, res) {
        res.send('API Root');
    });
        
        
        
//     //GET XML for calls
//        //API ROOT
//    app.post('/call', function (req, res) {
//        res.set('Content-Type','text/xml');
//        res.send(o2x({
//            '?xml version="1.0" encoding="utf-8"?' : null,
//            'Response':{
//                'Say': [{
//                    '@' : {
//                        'voice' : 'woman'
//                        
//                    },
//                    
//                    '#':'Alert from sensor one'
//                }]
//            
//        }}));
//        
//        console.log(res);
//    });



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
//       message.addNotification({
//  title: 'Alert!!!',
//  body: 'HELLO!!',
//  icon: '@drawable/ic_launcher'
//});
        
                    message.addData('message','Hi! '+body.name+' ,you have been registered to our service.');
                    message.addData('msgcnt','1');


        

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
            body: 'Hi,  Aishwariya  you have been subscribed to Arpan\'s sensor.' // body of the SMS message

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
        

//    //CALL TEST
//    //url/call
//    app.post('/callme', function (req, res) {
//                client.makeCall({
//
//    to:'+1949300078', // Any number Twilio can call
//    from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
//    url: 'https://smart-notification-server.herokuapp.com/call' // A URL that produces an XML document (TwiML) which contains instructions for the call
//
//}, function(err, responseData) {
//
//    //executed when the call has been initiated.
//    console.log(responseData.from); // outputs "+14506667788"
//
//});
//    });        
        
       

        
        
        


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

        
        //Registering a sensor to the service
        //Sensor can make post request to this url to add messages corresponding to triggerIDs
       
        app.post('/sensorreg', function (req, res) {
        var body = _.pick(req.body, 'sensorID', 'triggerID', 'message');
        console.log(body.sensorID);
        console.log(body.triggerID);
        console.log(body.message);

        //Add trigger to DB
        var trigger = new Trigger({
            sensorID: String,
            triggerID: String,
            message: String
        });

        trigger.save(function(err){
            if(err) throw err;

            console.log('Trigger from sensor: '+body.sensorID+' saved!');
        });

            res.json(body);
        
    });
        
        
        
        
        

        //SENSOR POSTS
        //url/sensor
        app.post('/sensor', function (req, res) {
            var body = _.pick(req.body, 'sensorID','triggerID');  
            
            console.log(body.sensorID);
            console.log(body.triggerID);
            //if wifi is false       
            
            Trigger.find({sensorID : body.sensorID, triggerID: body.triggerID}, function(err, trigger){
                if(err) console.log(err);
                console.log(trigger);
                console.log(trigger.message);
            });
            
            
            User.find({sensorID: body.sensorID}, 
            function(err,users){
                //user will return an array with all users that are registered to the sensor
                if(err) console.log(err);
                console.log(users);
                for(var i=0; i< users.length;i++){
                    console.log(users[i].name);
                    console.log(users[i].num);
                    client.sendMessage({
                        
                        

            to: users[i].num, // Any number Twilio can deliver to
            from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
            body: 'Arpan is in trouble -alert from sensor 1!!' // body of the SMS message

        }, function (err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { 

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."

            }
        });
                    
                }
                
            });
            res.json(body);
            
            //Logic to find message to send to user from DB
            //..
            //..
        
    });
        
        
        
        
        
        
        
        
    }
                 