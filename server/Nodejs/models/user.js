const mongoose =require('mongoose');

var User = mongoose.model('User',{
    email:{type:String},
    password:{type:String},
    isAdmin:{type:Boolean},
    favorites:[{type:String}]
});

module.exports =  {User:User};