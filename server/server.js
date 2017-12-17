var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pg = require('pg');
var bodyParser = require('body-parser');
// var socket = io('/my-namespace');
var path = require('path');
var routes = require('./controller/routes.js');

app.use(express.static('./client'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use('/', routes);

app.get('/room', function(req, res){
  res.sendFile(path.join(__dirname, '../client/html/chatroom.html'));
});
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../client/html/login.html'));
});
app.post('/', function(req, res){
  // console.dir(req);
  // res.jsonp(req.body);
  // res.sendFile(path.join(__dirname, '../client/html/chatroom.html'));
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on Port 3000');
});
