const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Place } = require('../models/place');

//=>localhost:3000/places/

router.get('/',(req,res)=>{
    Place.find((err,places)=>{
        if(!err){
            console.log("returning message from places");
            res.send(places);
        }
        else{
            console.log("Error in Retrieving places : "+JSON.stringify(err,undefined,2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/users/id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    Place.findById(req.params.id,(err,place)=> {
        if(!err){
            res.send(place);
        }
        else{
            console.log('Error in retrieving Place : '+ JSON.stringify(err,undefined,2));
            res.send(err.message);
        }
    });
});
module.exports = router;


