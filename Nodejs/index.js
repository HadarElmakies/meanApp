const express = require('express');
const bodyParser= require('body-parser');
var cookieParser = require('cookie-parser');
const http = require('http');

const socketIo = require('socket.io');


const {mongoose} = require('./db');
const cors = require('cors')

var userController = require('./controllers/userController');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))



const server = http.Server (app);
//app.listen(3000,()=>console.log('Server started at port : 3000'));
server.listen(3000);

const io = socketIo(server);
/*
io.on('connection',(socket)=>{
    socket.emit('hello',{
        greeting:'hello adi'
    });
});
*/

io.on('connection', function (socket) { //connection event. happends when a connection is initiated
    var clockInterval = setInterval(function(){ //running it every second
        var current_time = getCurrentTime(); //calculating the time
        socket.emit('clock-event', current_time); //emitting the clock-event through the socket
    },  1000);
    socket.on("disconnect", function(s) { //when the socket is being closed, destroy the interval
        console.log('user disconnected! resetting interval');
        clearInterval(clockInterval);
    });
});

function getCurrentTime(){
    var currentDate = new Date();
    var currentHours = addZeroToOneDigit(currentDate.getHours());
    var currentMinutes = addZeroToOneDigit(currentDate.getMinutes());
    var currentSeconds = addZeroToOneDigit(currentDate.getSeconds());
    var currentTime = currentHours + ":" + currentMinutes + ":" + currentSeconds;
    var html = parseHtml(currentTime);
    return html;
}

function addZeroToOneDigit(digits){
    var result = ((digits).toString().length === 1) ? "0" + digits : digits;
    return result;
}

function parseHtml(currentTime){
   return currentTime;
}

app.use('/users',userController);