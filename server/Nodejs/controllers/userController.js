const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10 ;// increase this if you want more iterations
const randomPassword = 'fakepassword';

var { Place } = require('../models/place');
var { User } = require('../models/user');

exports.connectedUsers =[];

//=>localhost:3000/users/
router.get('/',(req,res)=>{
        User.find((err,docs)=>{
            if(!err){
                console.log("returning message from users");
                res.send(docs);
            }
            else{
                console.log("Error in Retrieving User : "+JSON.stringify(err,undefined,2));
            }
        });
});

//=>localhost:3000/users/id
router.get('/:id',(req,res)=>{
   if(!ObjectId.isValid(req.params.id))
       return res.status(400).send('No record with given id : ${req.params.id}');

   User.findById(req.params.id,(err,user)=> {
       if(!err){
           this.connectedUsers.push(user);
           res.send(user);
       }
       else{
           console.log('Error in retrieving User : '+ JSON.stringify(err,undefined,2));
           res.send(err.message);
       }
   });
});

router.post('/',(req,res)=>{

    var user = new User({
        email:req.body.email,
        password:req.body.password,
        isAdmin:false
    });

    bcrypt.hash(user.password,saltRounds,function(err,hash){
       if(!err) {
           user.password=hash;
           user.save((err,doc)=>{
               if(!err){
                   this.connectedUsers.push(user);
                   res.send(doc);
               }
               else{
                   console.log('Error in User save : '+JSON.stringify(err,undefined,2));
               }
           });

       }
       else{
           console.log('Error in User password save : '+JSON.stringify(err,undefined,2));

       }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
        email: req.body.email,
        password: req.body.password,

    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record with given id : ${req.params.id}');
    }
    User.findByIdAndRemove(req.params.id,(err,doc)=>{
       if(!err){
           res.send(doc);
       }
       else{
           console.log('Error in User Delete : ' + JSON.stringify(err,undefined,2));

       }
    });
});



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


