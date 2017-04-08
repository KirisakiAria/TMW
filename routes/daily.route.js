'use strict';

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Daily = mongoose.model('Daily');


//新闻列表页
router.get('/', function(req, res, next) {
	News.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		}
		res.status(200).render('../views/news/daily.ejs', {
			title: 'DAILY',
			docs: docs
		});
	});
});
//单独文章页
router.get('/:dailyid', function(req, res, next) {
	//获取:xxx
	let daily = req.params.daily
	News.find({
		id: daily
	}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		}
		res.send(docs);
	});
});
module.exports = router;