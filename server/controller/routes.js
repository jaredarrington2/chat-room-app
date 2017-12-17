//importing dependencies
var express = require('express');
var pg = require('pg');
//path is built into node, so you do not have to do npm install for it
var path = require('path');

//using a built in express function called router that can store all of our routes
//and be exported for use in another file
var router = express.Router();

var dbUrl;

if(process.env.DATABASE_URL){
	dbUrl = process.env.DATABASE_URL
} else {
	dbUrl = {
		user: process.argv.POSTGRES_USER,
		password: process.argv.POSTGRES_PASSWORD,
		database: 'chatroom',
		host: 'localhost',
		port: 5432
	}
}

var pgClient = new pg.Client(dbUrl);
pgClient.connect();

router.get('/api/room', function(req, res){
  var query = 'SELECT roomname, active_users FROM rooms';
  pgClient.query(query, (error,queryRes) => {
    console.log(queryRes);
    if(error){
			res.json({error: error})
		} else {
			res.json({roomname: queryRes.rows})
		}
	});
})


router.get('/api/username', function(req, res){
  // var query = 'SELECT username FROM profiles';
  // pgClient.query(query, (error,queryResTwo) => {
  //   // console.log(queryResTwo);
  //   if(error){
	// 		res.json({error: error})
	// 	} else {
	// 		res.json({username: queryResTwo.rows})
	// 	}
	// });
	return(req.body);
})

router.post('/api/add-user', function(req,res){
	var insertQuery = 'INSERT INTO profiles (username) VALUES ($1)';
	pgClient.query(insertQuery, [req.body.username])
	// console.log(req.body);
});

console.log("This is working!");

module.exports = router;
