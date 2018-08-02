const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10 ;// increase this if you want more iterations
const randomPassword = 'fakepassword';

const manager = "Daniel";
var isManager = "false";


var jwt = require('jsonwebtoken');

var User  = require('../models/user');

//=>localhost:3000/users/
router.get('/',(req,res)=>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log("Error in Retrieving User : "+JSON.stringify(err,undefined,2));
        }
    });
});
/*
router.get('/:id',(req,res)=>{
   if(!ObjectId.isValid(req.params.id))
       return res.status(400).send('No record with given id : ${req.params.id}');
   User.findById(req.params.id,(err,doc)=> {
       if(!err){
           res.send(doc);
       }
       else{
           console.log('Error in retrieving User : '+ JSON.stringify(err,undefined,2));
       }
   });
});
*/
router.post('/login', function(req,res,next){
    let promise = User.findOne({email:req.body.email}).exec();

    promise.then(function(doc){
        if(doc) {
            if(doc.isValid(req.body.password)){
                // generate token
                let token = jwt.sign({username:doc.username},'secret', {expiresIn : '1h'});

                return res.status(200).json(token);

            } else {
                return res.status(501).json({message:' Invalid Credentials'});
            }
        }
        else {
            return res.status(501).json({message:'User email is not registered.'})
        }
    });

    promise.catch(function(err){
        return res.status(501).json({message:'Some internal error'});
    })
})


router.post('/register',  function(req,res,next){

    console.log("in user controller function register");
    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password:User.hashPassword(req.body.password),
        // creation_dt: Date.now()
    });

    let promise = user.save();

    promise.then(function(doc){
        return res.status(201).json(doc);
    })

    promise.catch(function(err){
        return res.status(501).json({message: 'Error registering user.'})
    })
})



router.post('/',(req,res)=>{

    var user = new User({
        email:req.body.email,
        password:req.body.password,
    });
    bcrypt.hash(user.password,saltRounds,function(err,hash){
        if(!err) {
            user.password=hash;
            user.save((err,doc)=>{
                if(!err){
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
        if (!err) { res.send(doc); }
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

//'http://localhost:3000/users/manager'
router.get('/manager',(req,res)=>{
    console.log("in mangager func on server" + isManager);
    return res.status(200).json(isManager);


});


router.get('/username', verifyToken, function(req,res,next){
    console.log("the token in func"+ req.query.token);
    console.log(decodedToken.username.toString());

    if(decodedToken.username.toString()==manager){
        isManager=true;

    }
    else{
        isManager=false;
    }
    return res.status(200).json(decodedToken.username);
});

var decodedToken='';
function verifyToken(req,res,next){


    let token = req.query.token;

    console.log("The token of the user:" +token);

    jwt.verify(token,'secret', function(err, tokendata){
        if(err){
            return res.status(400).json({message:' Unauthorized request'});
        }
        if(tokendata){
            decodedToken = tokendata;
            next();
        }
    })
}



module.exports =router;