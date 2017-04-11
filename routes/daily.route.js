'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Daily = mongoose.model('Daily');


//日志列表页
router.get('/', function(req, res, next) {
	Daily.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		}
		res.status(200).render('../views/daily/daily.ejs', {
			title: 'DAILY',
			docs: docs
		});
	});
});

//单独文章页
router.get('/:dailyid', function(req, res, next) {
	//获取:xxx
	let daily = req.params.daily;
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