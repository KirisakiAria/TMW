'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = mongoose.model('News');


//新闻列表页
router.get('/', (req, res, next) => {
	News.find({}, null, {
			limit: 6
		},
		(err, docs) => {
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

//新闻分页
router.get('/page/:pageid', (req, res, next) => {
	let pageid = parseInt(req.params.pageid);
	News.find({}, null, {
			skip: (pageid - 1) * 6,
			limit: 6
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
router.get('/:newsid', (req, res, next) => {
	//获取:xxx
	let newsid = req.params.newsid;
	News.find({
		id: newsid
	}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		}
		res.send(docs);
	});
});
module.exports = router;