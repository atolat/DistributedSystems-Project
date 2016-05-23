 module.exports = function(app){
    var _=require('underscore');
    var testdata=[];
        //GCM integration
        var gcm=require('node-gcm');
var message = new gcm.Message();
message.addData('key1', 'msg1');
//var regTokens = ['YOUR_REG_TOKEN_HERE'];
    //GCM integration
    //Set up the sender with you API key
    var sender = new gcm.Sender('AIzaSyDdMT2Y1-OZFLOTLI1haEPoudYSuz38KRM');


    //GET request to fetch all data
    //GET /alldata
    app.get('/alldata',function(req,res){
    res.json(testdata);
    });
    var Id=1;

    //GET /data/:id
    app.get('/data/:id',function(req,res){
    var Id=parseInt(req.params.id);
    var matchdata= _.findWhere(testdata,{id: Id});

    if(!matchdata){
    res.status(404).send();
    }
    res.json(matchdata);


    });

    //POST request to pass user data to app in JSON
    // POST /data
    //Data Schema ({username: String, reqToken: String, message: String})
    app.post('/data',function(req,res){
    var body = _.pick(req.body,'reqToken','message'); 
    res.json(body);


    //Send GCM message for post requests
    var message = new gcm.Message();

    message.addData('key1', body.message);
    var regTokens = body.reqToken;


    sender.send(message, regTokens, function (err, response) {
    if(err) console.error(err);
    else 	console.log(response);
    });

    });

    //DELETE /data/:id
    app.delete('/data/:id',function(req,res){
    var Id=parseInt(req.params.id);
    var matchdata= _.findWhere(data,{id: Id});

    if(!matchdata){
    res.status(404).send();
    }
    data=_.without(data,matchdata);
    res.json(matchdata);


    });

    //PUT (UPDATE) /data/:id
    app.put('/data/:id',function(req,res){
    var Id=parseInt(req.params.id);
    var matchdata= _.findWhere(data,{id: Id});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttribute={};

    if(!matchdata){
    return res.status(404).send();
    }

    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
    validAttribute.completed=body.completed;
    } else if(body.hasOwnProperty('completed')){
    return res.status(400).send();
    }

    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length>0){
    validAttribute.description=body.description;
    } else if(body.hasOwnProperty('description')){
    return res.status(400).send();
    }

    _.extend(matchdata, validAttribute);
    res.json(matchdata);
    });

    }