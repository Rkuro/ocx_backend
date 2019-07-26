const express = require('express');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const router = express.Router();
const db = require('../db/api');


/* GET home page. */
router.get('/', function(req, res, next) {
  	res.send(JSON.stringify({}));
});

const convertDbResponseToResult = (dbResponse) => {
	
}

router.post('/email-signup', (req,res,next) => {

	console.log("Received email signup with payload:",req.body, typeof req.body)

	let json = req.body

	assert(json.hasOwnProperty('emailAddress'))
	assert(json.hasOwnProperty('firstName'))
	assert(json.hasOwnProperty('lastName'))

	console.log("Writing ")

	let db_response = db.update("ocx","users",
	{
		emailAddress:json.emailAddress
	}, 
	{
		"$set":json
	}
	);

	console.log("db_response",db_response)

	const response = {
		status:"success",
		data:{}
	}

	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(response))
})

module.exports = router;
