var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

router.get('/email-signup', (req,res,next) => {

	let response = {
		"ack":true
	}

	res.send(JSON.stringify(response))
})

module.exports = router;
