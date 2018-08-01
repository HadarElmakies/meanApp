const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
    email:{type:String},
    password:{type:String},
    isAdmin:{type:Boolean},
    favorites:[{type:String}]
});


var User = module.exports = mongoose.model('User',UserSchema);


module.exports.getUserByEmail = function(email,callback){
    User.findOne({email:email},callback);
};

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

module.exports.getAllUsers = function(callback){
    User.find(callback);
};

module.exports.createUser = function(newUser,callback){

    User.find({email:newUser.email},(err,user)=> {
        if(!err){
            if (user.length) {
                console.log("user is already exist");
                callback(new Error("user exist"),user);
            }
            else {
                bcrypt.genSalt(10,function(err,salt){
                    bcrypt.hash(newUser.password,salt,function(err,hash){
                        newUser.password=hash;
                        newUser.save(callback);
                    });
                });
            }
        }
        else {
            throw err;
        }
    });
};

module.exports.comparePasswords = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err;
        callback(null,isMatch);
    });
};
