'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Daily = mongoose.model('Daily');


//日志列表页
router.get('/', (req, res, next) => {
	Daily.find({}, (err, docs) => {
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

//日志分页
router.get('/page/:pageid', (req, res, next) => {
	let pageid = parseInt(req.params.pageid);
	Daily.find({}, null, {
			skip: (pageid - 1) * 9,
			limit: 9
		},
		(err, docs) => {
			if (err) {
				console.log(err);
				return next();
			} else {
				res.send(docs);
			}
		});
});

//单独文章页
router.get('/:dailyid', (req, res, next) => {
	//获取:xxx
	let dailyid = req.params.dailyid;
	Daily.find({
		id: dailyid
	}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		}
		res.send(docs);
	});
});
module.exports = router;