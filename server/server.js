var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./controller/routes.js');
var pg = require('pg');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(express.static('./client'));

app.use('/', routes);

io.on('connection', function(socket){
  console.log('A user connected')
  socket.on('disconnect', function(){
    console.log('A user disconnected')
  })
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   // console.log('someone connected');
//   nsp.emit('hi', 'Hello everyone!');
// });

// //New user has joined
// var player = 0;
// io.on('connection', function(socket){
//   player++
//   socket.emit('newuserconnect', {description: 'Hey, Welcome!'});
//   socket.broadcast.emit('newuserconnect', {description: player + ' users connected!'});
//   socket.on('disconnect', function(){
//     player--;
//     socket.broadcast.emit('newuserconnect', {description: player + ' users connected!'});
//   });
// });
//

//Sends messages to chatroom
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

server.listen(3000, function(){
  console.log('Ready...');
});
