'use strict';

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let News = mongoose.model('News');


//新闻列表页
router.get('/', function(req, res, next) {
	News.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		}
		res.status(200).render('../views/news/news.ejs', {
			title: 'NEWS',
			docs: docs
		});
	});
});

//单独文章页
router.get('/:newsid', function(req, res, next) {
	//获取:xxx
	let newsid = req.params.newsid
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