var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var News = mongoose.model("News");


//新闻列表页
router.get('/', function(req, res, next) {
	var news = new News({
		title: "test",
		author: "test",
		date: new Date(),
		content: "test"
	});

	news.save(function(err, doc) {
		if (err) {
			console.log(err);
			return next();
		}
	});
	News.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		}
		res.status(200).render('../views/news/news.ejs', {
			title: "NEWS",
			newstitle: docs[0].title,
			author: "admin"
		});
	});
});
module.exports = router;