const mongoose =require('mongoose');

var User = mongoose.model('User',{
    email:{type:String},
    password:{type:String},
    isAdmin:{type:Boolean}
});

module.exports =  {User:User};