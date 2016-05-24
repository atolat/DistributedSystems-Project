 module.exports = function(app){
    var _=require('underscore');
     var bodyParser = require('body-parser');
     app.use(bodyParser.json());
    var testdata=[];
        //GCM integration
        var GCM = require('gcm').GCM;

var apiKey = 'AIzaSyDdMT2Y1-OZFLOTLI1haEPoudYSuz38KRM';

  var gcm = new GCM(apiKey);
var message = {
    registration_id: 'fKp3WaVSsNI:APA91bFnAHkydqqbLdytF2RGdsNpjSFA7TcIvnZIx5fwfvAXfNkPrW_jEOVPBvxnXZeFLReOVE9eTUY8pvafxikFNUjveWUOPF4y2OLBlLvOOB1Hl8vKzVWgxMJ5AS0FR-ybW4zkYVe8', // required
    collapse_key: 'Collapse key', 
    'data.key1': 'value1',
    'data.key2': 'value2'
};

     app.get('/',function(req, res){
        res.send('Todo API Root');
    });

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
    // POST /todos
    app.post('/alldata',function(req,res){
        var body = _.pick(req.body,'description','completed'); 
       
        //Validation
        if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){
            return res.status(400).send();
        }



        //console.log(body.description);
         body.description=body.description.trim();
         body.id=todoId;
            todos.push(body);
            todoId++;
        gcm.send(message, function(err, messageId){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Sent with message ID: ", messageId);
    }
});
        

        res.json(body);

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