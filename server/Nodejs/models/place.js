const mongoose =require('mongoose');

var Place = mongoose.model('Place',{
    name:{type:String},
    description:{type:String},
    country:{type:String},
    rating:{type:Number},
    imageUrl:{type:String}
});

module.exports =  {Place:Place};