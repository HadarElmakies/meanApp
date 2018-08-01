const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const randomPassword = 'fakepassword';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var { Place } = require('../models/place');
var  User  = require('../models/user');


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
       User.getUserByEmail(username,function(err,user){
           if(err) {
               console.log("passport.use error getUserByEmail");
               throw err;
           }
           if(!user){
               console.log("passport.use error no user with this email");
               return done(null,false,{message:'unknown user'});
           }
           User.comparePasswords(password,user.password,function(err,isMatch){
               if(err) {
                   console.log("passport.use error comparePasswords");
                   throw err;
               }
               if (isMatch){
                   console.log("passport.use passwords matches");
                   return done(null,user);
               }
               else {
                   console.log("passport.use passwords not matches");
                   return done(null,false,{message:"Invalid password"});
               }
           })
       });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

//http://localhost:3000/users/login?email=qqq@gmail.com&password=ddd111
router.get('/login',passport.authenticate('local'),(req,res)=>{
    var user = req["user"];
    res.send(user);
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.send(true);

});

router.get('/register/:email/:password',(req,res)=>{

    console.log("register");
    var newUser = new User({
        email:req.params.email,
        password:req.params.password,
        isAdmin:false
    });

    User.createUser(newUser,function(err,user){
        if (!err) {
            console.log("register success " + user);
            res.send(user);
        }
        else {
            console.log("register error" );
            res.send(false);
        }
    })
});

//=>localhost:3000/users/
router.get('/',(req,res)=>{

    if (req.isAuthenticated()) {
        User.getAllUsers((err, allUsers) => {
            if (!err) {
                console.log("returning message from users");
                res.send(allUsers);
            }
            else {
                console.log("Error in Retrieving User : " + JSON.stringify(err, undefined, 2));
                res.send(err.message);
            }
        });
    }
    else {
        res.send("UnAuthorized");
    }
});





// router.put('/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
//
//     var user = {
//         email: req.body.email,
//         password: req.body.password,
//
//     };
//     User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
//         if (!err) {
//             res.send(doc);
//         }
//         else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
//     });
// });
//
// router.delete('/:id',(req,res)=>{
//     if(!ObjectId.isValid(req.params.id)){
//         return res.status(400).send('No record with given id : ${req.params.id}');
//     }
//     User.findByIdAndRemove(req.params.id,(err,doc)=>{
//        if(!err){
//            res.send(doc);
//        }
//        else{
//            console.log('Error in User Delete : ' + JSON.stringify(err,undefined,2));
//
//        }
//     });
// });



//favoritessssssssssssssssssssssssssssssssssssssssss
router.get('/:id/favorites',(req,res)=> {

    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }

    //get the user by id
    User.find({ObjectId:req.params.id,favorites:{}},(err,favoritesPlacesIDs)=> {
        if(!err) {
            let favoritesPlaces = [];
            //get the user favorite places by their ids
            favoritesPlacesIDs.forEach(function(placeId){
                Place.find({ObjectId:placeId},(err,favoritesPlace)=> {
                         if(!err) {
                            favoritesPlaces.push(favoritesPlace);
                         }
                         else {
                             console.log("error get favorites places of user");
                             console.log(err.message);
                              res.send(err.message);
                         }
                         if (favoritesPlacesIDs.length === favoritesPlaces.length){
                             console.log("favorites places of user returned with count: " + favoritesPlaces.length);
                             res.send(favoritesPlaces);
                         }
                });
            });
        }
        else {
            console.log("error get favorites places of user");
            console.log(err.message);
            res.send(err.message);
        }
    });
});



//remove place id from user favorites
router.delete('/:id/favorites/:placeId',(req,res)=>{

    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }

    User.update({ObjectId:req.params.id},{$unset:{favorites:req.params.placeId}},(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in User Delete : ' + JSON.stringify(err,undefined,2));

        }
    });
});

//add place id from user favorites
router.post('/:id/favorites/:placeId',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }
    User.update({ObjectId:req.params.id},{$set:{favorites:req.params.placeId}},(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in User Delete : ' + JSON.stringify(err,undefined,2));

        }
    });
});
module.exports =router;


