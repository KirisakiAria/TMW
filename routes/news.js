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
	res.locals = {
		title:"NEWS",
		newstitle:"TEST",
		author:"admin",
	}
	res.status(200).render('../views/news/news.ejs');
});
module.exports = router;