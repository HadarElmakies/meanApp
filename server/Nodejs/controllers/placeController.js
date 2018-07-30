const express = require('express');
const https = require('https');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var allPlaces = require('../places');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCfqA3SrRmnbCx1B1nxE9znS9ihjyhpaDg'
});


var { Place } = require('../models/place');

//=>localhost:3000/places/

router.get('/',(req,res)=>{
    console.log(allPlaces.Aplaces.length);
    res.send(allPlaces.Aplaces);
});



// router.get('/',(req,res)=>{
//
//     googleMapsClient.placesAutoComplete({
//         input: 'castle',
//         sessiontoken:'05176f42-cce0-495e-a5b9-a98d78a0608a',
//         types: 'establishment'
//     }, function(err, response) {
//         if (!err ) {
//             console.log(response.json["predictions"]);
//             var arr = response.json["predictions"];
//             var placesIDs = getPlacesIDs(arr);
//             getPlacesByIds(placesIDs,function(places){
//                 res.send(places);
//             });
//         } else{
//             console.log(err)
//             res.send(err);
//         }
//     });
//
// });
//
// function getPlacesByIds(placesIDs,callback){
//
//     var placesIDsCount = placesIDs.length;
//     var places = [];
//     placesIDs.forEach(function (entry) {
//         console.log(entry);
//         googleMapsClient.place({
//                  placeid: entry
//              }, function(err, response) {
//              if (!err ) {
//                  //console.log("got place by id:");
//                  console.log(response.json);
//                  places.push(response.json.result["name"]);
//
//              } else{
//                 console.log(err);
//                  places.push(err);
//              }
//              if (places.length === placesIDsCount){
//                  callback(places);
//              }
//         });
//
//     });
// }
//
//
// function getPlacesIDs(dataArray){
//
//     //console.log(dataArray);
//     var placesIDs = [];
//     dataArray.forEach(function(entry) {
//         //console.log(entry);
//         if (entry["place_id"]!=null) {
//             placesIDs.push(entry["place_id"]);
//         }
//     });
//
//     return placesIDs;
// }


//=>localhost:3000/places/id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    Place.findById(req.params.id,(err,doc)=> {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in retrieving User : '+ JSON.stringify(err,undefined,2));
        }
    });
});


module.exports =router;


