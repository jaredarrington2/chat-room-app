var pg = require('pg');
var express = require('express');
var path = require('path');
var router = express.Router();
var html_creator = require('../helpers/html_creator.js')
var app = express();
var dbUrl = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'Chatroom',
  host: 'localhost',
  port: 5432
};

var pgClient = new pg.Client(dbUrl);

pgClient.connect();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/html/index.html'));
});

router.get('/rooms', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/html/rooms.html'));
});

router.get('/profile', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/html/profile.html'));
});

router.get('/chatroom-joined-:room_name', function(req, res) {
  var x = req.params.room_name.split("+").join(" ");
  res.sendFile(path.join(__dirname, '../../client/html/chatroom.html'));
});

router.get('/api/chatrooms', (req, res) => {
  var query = 'SELECT * FROM chatrooms';
  pgClient.query(query, (error, queryRes) => {
    //console.log(queryRes);
    if (error) {
      res.json({
        error: error
      })
    } else {
      res.json({
        chatrooms: queryRes.rows
      })
    }
  });
});

router.get('/api/chatrooms/:room_name', function(req, res) {
  var roomName = req.params.room_name.split("+").join(" ");
  pgClient.query('SELECT * FROM chatrooms', function(roomErr, roomRes) {
    console.log(req.params)
    var selectedRoom = [];
    for (var i = 0; i < roomRes.rows.length; i++) {
      if (roomRes.rows[i].room_name.toLowerCase() === roomName) {
        selecteRoom.push(roomRes.rows[i]);
      }
    }
    res.set('Content-Type', 'text/html');
    res.send(html_creator(selectedSong[0]));
  });
});


router.post('/api/create-room', function(req, res) {
  if (req.body.room_name !== '') {
    var insertQuery = 'INSERT INTO chatrooms (room_name) VALUES ($1)';
    pgClient.query(insertQuery, [req.body.room_name], (error, queryRes) => {
      console.log(req.body.room_name)
      if (error) {
        res.json(error)
      } else {
        res.json(queryRes)
      }
    })
  } else if ((req.body.room_name !== '') || (req.body.room_name === '')) {
    res.json("null_message")
  }
})



// router.post('/api/create-room', (req,res) => {
// 	if(req.body.name !== ''){
// 		var query = "INSERT INTO chatrooms (room_name) VALUES ($1)";
// 		pgClient.query(query, [req.body.name], (error,queryRes) => {
// 			if(error){
// 				res.json(error)
// 			} else {
// 				res.json(queryRes)
// 			}
// 		});
// 	} else if (req.body.name === '') {
// 		var query = "INSERT INTO chatrooms (room_name) VALUES ($1)";
// 		pgClient.query(query, ["Guest", req.body.message], (error,queryRes) => {
// 			if(error){
// 				res.json(error)
// 			} else {
// 				res.json(queryRes)
// 			}
// 		});
// 	} else if ((req.body.name !== '')) {
// 		res.json("null_message")
// 	}
// });

router.delete('/api/delete-record/:room_id', function(req, res) {
  pgClient.query("DELETE FROM chatrooms WHERE id=" + req.params.id);
})

module.exports = router;
