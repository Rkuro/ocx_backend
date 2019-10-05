const express = require('express');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const router = express.Router();
const db = require('../db/api');
const assert = require('assert');
const email = require('../src/email/email')

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.send(JSON.stringify({}));
});

const convertDbResponseToResult = (dbResponse) => {
	
}

router.post('/email-signup', (req,res,next) => {

	// Construct sender
	const email_sender = new Email()

	console.log("Received email signup with payload:",req.body, typeof req.body)

	let json = req.body

	assert.equal(json.hasOwnProperty('emailAddress'),true)
	assert(json.hasOwnProperty('firstName'))
	assert(json.hasOwnProperty('lastName'))

	console.log("Writing ")

	db.update("ocx","users",
		{
			emailAddress:json.emailAddress
		}, 
		{
			"$set":json
		})
		.then(result => {
			console.log("db_response",result)

			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(result))
		})
		.catch(err => {
			console.error(err)
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				status:"error",
				data:{}
			}))
		})

	email_sender.sendEmail(json.emailAddress)
		.then(result => {
			console.log("Successfully sent email to ", json.emailAddress)
		})
		.catch(err => {
			console.error('Error sending email: ',err)
		})

	
})

module.exports = router;
