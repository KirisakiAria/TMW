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
			docs: docs
		});
	});
});
//单独文章页
router.get('/:newsid', function(req, res, next) {
	//获取:xxx
	var newsid = req.params.newsid
	News.find({
		id: newsid
	}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		}
		res.send(docs);
	});
});
module.exports = router;