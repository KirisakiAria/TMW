var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var News = mongoose.model("News");

//cms
router.get('/', function(req, res, next) {
	res.status(200).render('../views/server/cms.ejs');
});

router.get('/watchnews', function(req, res, next) {
	News.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		} 
		res.json(docs);
	});
});

// router.get('/createnews', function(req, res, next) {
// 	var news = new News({
		
// 	})
// });

module.exports = router;