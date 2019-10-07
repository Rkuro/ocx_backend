const express = require('express');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const router = express.Router();
const db = require('../db/api');
const assert = require('assert');
const email = require('../src/email/email');



/* GET home page. */
router.get('/', function(req, res, next) {
  	res.send(JSON.stringify({}));
});

const convertDbResponseToResult = (dbResponse) => {
	
}

router.post('/email-signup', (req,res,next) => {

	console.log("Received email signup with payload:",req.body, typeof req.body)

	let json = req.body

	assert.equal(json.hasOwnProperty('emailAddress'),true)
	assert(json.hasOwnProperty('firstName'))
	assert(json.hasOwnProperty('lastName'))

	console.log("Writing ")

	handleEmailSignup(json)
		.then(resp => {
			console.log("success:",resp)
			res.send(JSON.stringify(resp))
		})
		.catch(err => {
			console.error(err)
		})

	
})

const handleEmailSignup = async (json_payload) => {

	// Construct sender
	const email_sender = new email()

	let promises = []

	let db_promise = db.update("ocx","users",
		{
			emailAddress:json_payload.emailAddress
		}, 
		{
			"$set":json_payload
		})

	let email_promise = email_sender.sendEmailSignupResponse(json_payload.emailAddress)

	promises.push(db_promise)
	promises.push(email_promise)

	await Promise.all(promises)
		.then(results => {
			return results
		})
		.catch(err => {
			console.error("Email signup error",err)
			throw err
		})

	
	
}

module.exports = router;
