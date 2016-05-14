var express = require('express');
    var bodyParser= require('body-parser');
    var _=require('underscore');

    var app = express();
    var PORT = process.env.PORT || 3000;
    var testdata=[{
        id: 1,
        description: 'Task 1',
        completed: true
    },{
        id: 2,
        description: 'Task 2',
        completed: true
    },{
        id: 3,
        description: 'Task 3',
        completed: true
    },{
        id: 4,
        description: 'Task 4',
        completed: true
    }];
    var Id=1;

    app.use(bodyParser.json());

    app.get('/',function(req, res){
        res.send('API Root');
    });

    //GET request to fetch all data
    //GET /alldata
    app.get('/alldata',function(req,res){
        res.json(testdata);
    })
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
    app.post('/data',function(req,res){
        var body = _.pick(req.body,'description','completed'); 
       
        //Validation
        if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){
            return res.status(400).send();
        }



        //console.log(body.description);
         body.description=body.description.trim();
         body.id=Id;
            data.push(body);
            Id++;

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


    app.listen(PORT,function(){
       console.log('Express listening on port:: '+PORT);

    })