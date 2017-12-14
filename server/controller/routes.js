//importing dependencies
var express = require('express');
//path is built into node, so you do not have to do npm install for it
var path = require('path');

//using a built in express function called router that can store all of our routes
//and be exported for use in another file
var router = express.Router();

//requiring our data object for later use in this file
// var obj = require('../models/object.js');
//
// router.get('/', function(req,res){
//   console.log(res)
//   });
