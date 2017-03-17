var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var News = mongoose.model("News");


//新闻列表页
router.get('/', function(req, res, next) {
	News.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		} 
		res.status(200).render('../views/news/news.ejs', {
			title: "NEWS",
			docs:docs
		});
	});
});
module.exports = router;