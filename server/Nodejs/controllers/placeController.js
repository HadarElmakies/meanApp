const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { Place } = require('../models/place');

//=>localhost:3000/places/
router.get('/',(req,res)=>{
    console.log("get places");
    Place.find((err,places)=>{
        if(!err){
            console.log("returning message from places");
            console.log(places.length);
            res.send(places);
        }
        else{
            console.log("Error in Retrieving places : "+JSON.stringify(err,undefined,2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/places/country
router.get('/country/:country',(req,res)=>{

    const countryName = req.params.country;

    Place.find({country:countryName},(err,places)=> {
        if(!err){
            console.log("places found: " + places.length);
            res.send(places);
        }
        else{
            console.log('Error in retrieving Place : '+ JSON.stringify(err,undefined,2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/places/name
router.get('/name/:name',(req,res)=>{

    console.log("get places with params");
    const placeName = req.params.name;

    Place.find({name:"Eiffel Tower"},(err,place)=> {
        if(!err){
            console.log("places was found");
            res.send(place);
        }
        else{
            console.log('Error in retrieving Place : '+ JSON.stringify(err,undefined,2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/places/rating/minRate/MaxRate
router.get('/rating/:minRate/:maxRate',(req,res)=>{

    console.log("get places with params");

    const minRate = req.params.minRate;
    const maxRate = req.params.maxRate;

    console.log(minRate);
    console.log(maxRate);
    Place.find({rating:{$gte:minRate,$lte:maxRate}},(err,places)=> {
        if(!err){
            console.log("places found: " + places.length);
            res.send(places);
        }
        else{
            console.log('Error in retrieving Place : '+ JSON.stringify(err,undefined,2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/places/country/minRate/maxRate
router.get('/country&rating/:country/:minRate/:maxRate',(req,res)=>{

    console.log("get places with params");
    const countryName = req.params.country;
    const minRate = req.params.minRate;
    const maxRate = req.params.maxRate;


    console.log(countryName);
    Place.find({country:countryName,rating:{$gte:minRate,$lte:maxRate}},(err,places)=> {
        if(!err){
            console.log("places found: " + places.length);
            res.send(places);
        }
        else{
            console.log('Error in retrieving Place : '+ JSON.stringify(err,undefined,2));
            res.send(err.message);
        }
    });
});


module.exports = router;


