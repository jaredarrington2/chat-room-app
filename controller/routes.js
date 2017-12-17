        /* <------------------------------------------------------------------> */ 
  
//setup for connection database 
  
//node modules to request 
var pg = require('pg'); 

//you have to pick the database to connect to; 
var dbUrl = { 
    user: process.argv.POSTGRES_USER, 
    password: process.argv.POSTGRES_PASSWORD, 
    database: 'chat_app', 
    host: 'localhost', 
    port: 5432 
}; 

//creating a client to connect to, which as you see, uses the object that we set up 
var pgClient = new pg.Client(dbUrl); 

//officially connecting to that postgres database 
pgClient.connect(); 

/* <------------------------------------------------------------------> */ 

var express = require('express'); 
var path = require('path'); 

var router = express.Router(); 

router.get('/', function(req,res){ 
res.sendFile(path.join(__dirname, '../../client/html/index.html')); 

}); 

router.get('/api/users', (req,res) => { 
    pgClient.query('SELECT * FROM users', (error,queryResTwo) => { 
        console.log(queryResTwo.rows)
        res.json(queryResTwo.rows);
    })
}); 

router.get('/api/profile/:id', function(req, res){
    var userInfo = [];
    // var query = `INSERT INTO profile profile.id, profile.name, profile.username, profile.email, profile.message, profile, profile.interest, profile.dob FROM profile INNER JOIN users ON profile.user=${req.params.id}`
    var query = 'SELECT * FROM profile WHERE user_id=' + req.params.id
    pgClient.query(query, (error, queryRes) => {
        if (error){
            res.json({error: error})
        } else {
            res.json({results: queryRes.rows})
        }
    });
});

router.post('/api/sign-up', function(req, res){
    var userInfo = [];
    var query = `INSERT INTO users (name, last, email, password) VALUES ($1,$2,$3,$4,$5)`;
    if(req.body.password === req.body.confirm_password){
        pgClient.query(query, [req.body.name, req.body.last, req.body.email, req.body.password, req.body.confirm_password], (error, queryRes) => {
            if (error){
                res.json({error: error})
            } else {
                res.json({results: queryRes})
            }
        });
    } else {
        res.json({error: "Passwords do not match"})
    }
});

router.post('/api/create_profile', function(req, res){
    var userInfo = [];
    var query = `INSERT INTO profile (name, email, username, interest, dob, message) VALUES ($1,$2,$3,$4,$5,$6)`
    pgClient.query(query, [req.body.name, req.body.email, req.body.username, req.body.interst, req.body.dob, req.body.message], (error, queryRes) => {
        if (error){
            res.json({error: error})
        } else {
            res.json({results: queryRes})
        }
    });
});

router.post('/api/sign-in', function(req, res){
    var userInfo = [];
    var query = `SELECT * FROM users WHERE email='${req.body.email}'`
    pgClient.query(query, (error, queryRes) => {

        if (error){
            res.json({error: error})
        } else {
            res.json({results: queryRes})
        }
    });
});

module.exports = router; 