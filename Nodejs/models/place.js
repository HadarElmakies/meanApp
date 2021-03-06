const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
    name:{type:String},
    description:{type:String},
    country:{type:String},
    rating:{type:Number},
    imageUrl:{type:String},
    longitude:{type:Number},
    latitude:{type:Number},
    category:{type:String}
});

var Place = module.exports = mongoose.model('Place',placeSchema);

module.exports.getPlaces = function(callback){
    Place.find(callback);
};


module.exports.getPlacesByCountryName = function(countryName,callback){
    Place.find({country: countryName},callback);
};

module.exports.getPlacesByRating = function(minRate,maxRate,callback){

    Place.find({rating: {$gte: minRate, $lte: maxRate}},callback);
};

module.exports.getPlaceByPlaceName = function(placeName,callback){

    Place.find({name: placeName},callback);
};

module.exports.getPlacesByCountryAndRating = function(countryName,minRate,maxRate,callback){

    Place.find({country: countryName, rating: {$gte: minRate, $lte: maxRate}},callback);
};


module.exports.getFavoritesPlaces = function(favoritesPlacesIDs,callback){

    console.log("in favorite places");
    Place.find({_id:{$in: favoritesPlacesIDs}},callback);
};

module.exports.getRecommendedPlaces = function(favoritesPlacesIDs,callback){

    var favoritesIDs = [];
    favoritesPlacesIDs.forEach(entry =>{
        favoritesIDs.push(mongoose.Types.ObjectId(entry));
    });


    var callbackForGroup = function(err,group){
        Place.find({category:group[0],_id: {$nin: favoritesIDs}},callback).limit(3);
    };

    Place.aggregate([
        {$match: {_id: {$in: favoritesIDs}}},
        //{$sortByCount: "$category"}
        {$group: {_id:"$category",count: {$sum: 1}}},
        { $sort: { count: -1 } },
        {$limit: 1}
    ],callbackForGroup);
};
