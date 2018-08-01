const express = require('express');
const bodyParser= require('body-parser');
const {mongoose} = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');
//var imageClassefier = require('./tensorflow/manager');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    console.log("client conected");
    res.send('Hello client!')
});

app.listen(3000,()=>console.log('Server started at port : 3000'));


app.use('/users',userController);
app.use('/places',placeController);
app.use('/images', express.static(__dirname + '/Images'));
module.exports = passport;
