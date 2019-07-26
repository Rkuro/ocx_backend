const express = require('express');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const router = express.Router();
const db = require('../db/api');


/* GET home page. */
router.get('/', function(req, res, next) {
  	res.send(JSON.stringify({}));
});


router.post('/email-signup', (req,res,next) => {

	console.log("Received email signup with payload:",req.body);

	const json = JSON.parse(req.body);

	assert(json.hasOwnProperty('emailAddress'));
	assert(json.hasOwnProperty('firstName'));
	assert(json.hasOwnProperty('lastName'));

	let response = db.write("ocx","users",
	{
		emailAddress:json.emailAddress
	}, 
	{
		"$set":json
	}
	);
	
	res.send(JSON.stringify(response))
})

module.exports = router;
