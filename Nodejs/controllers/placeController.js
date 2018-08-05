const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var Place  = require('../models/place');

//=>localhost:3000/places/
router.get('/',(req,res)=>{
    console.log("get places");
    Place.getPlaces(function(err, places){
        if (!err) {
            console.log("returning message from places");
            console.log(places.length);
            res.send(places);
        }
        else {
            console.log("Error in Retrieving places : " + JSON.stringify(err, undefined, 2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/places/country
router.get('/country',(req,res)=>{

    const countryName = req.body.country;

    Place.getPlacesByCountryName(countryName,function(err,places){
        if (!err) {
            console.log("places found: " + places.length);
            res.send(places);
        }
        else {
            console.log('Error in retrieving Place : ' + JSON.stringify(err, undefined, 2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/places/name
router.get('/name',(req,res)=>{

    console.log("get places with params");
    const placeName = req.body.name;
    Place.getPlaceByPlaceName(placeName,function(err,place){
        if (!err) {
            console.log("places found: " + place.length);
            res.send(place);
        }
        else {
            console.log('Error in retrieving Place : ' + JSON.stringify(err, undefined, 2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/places/rating
router.get('/rating',(req,res)=>{

    console.log("get places with params");
    const minRate = req.body.minRate;
    const maxRate = req.body.maxRate;

    console.log(minRate);
    console.log(maxRate);

    Place.getPlacesByRating(minRate,maxRate,function(err,places){
        if (!err) {
            console.log("places found: " + places.length);
            res.send(places);
        }
        else {
            console.log('Error in retrieving Place : ' + JSON.stringify(err, undefined, 2));
            res.send(err.message);
        }
    });
});

//=>localhost:3000/places/country&rating
router.get('/country&rating',(req,res)=>{

    console.log("get places with params");
    const countryName = req.body.country;
    const minRate = req.body.minRate;
    const maxRate = req.body.maxRate;

    console.log(countryName);

    Place.getPlacesByCountryAndRating(countryName,minRate,maxRate,function(err,places){
        if (!err) {
            console.log("places found: " + places.length);
            res.send(places);
        }
        else {
            console.log('Error in retrieving Place : ' + JSON.stringify(err, undefined, 2));
            res.send(err.message);
        }
    });
});


module.exports = router;
