module.export=function(final-server){
    var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    token: String,
    num1: String,
    num2: String    
    
});


var User = mongoose.model('User',userSchema);
};
//module.exports = User;