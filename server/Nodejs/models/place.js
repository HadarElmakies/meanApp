const mongoose =require('mongoose');

var PlaceSchema= mongoose.Schema({
    name:{type:String},
    description:{type:String},
    country:{type:String},
    rating:{type:Number},
    imageUrl:{type:String},
    location: {
        longitude:{type:Number},
        latitude:{type:Number}
    }
});


module.exports.gePlaces = function(callback){
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

var Place = module.exports = mongoose.model('Place',PlaceSchema);