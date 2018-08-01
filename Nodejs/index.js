const express = require('express');
const bodyParser= require('body-parser');

const {mongoose} = require('./db');
const cors = require('cors')

var userController = require('./controllers/userController');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000,()=>console.log('Server started at port : 3000'));

app.use('/users',userController);