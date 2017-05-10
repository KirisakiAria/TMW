'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MainContent = mongoose.model('MainContent');
const News = mongoose.model('News');


//新闻列表页
router.get('/', (req, res, next) => {
	var a = new MainContent({
		id: 2,
		title: 'NEWS', //英文标题
		describe: '传说永不凋零', //中文信息
		bgsrc: '', //背景路径
		author: 'admin', //作者
		editor: 'admin', //修改人
		time: new Date() //发表时间
	});
	a.save();
	(async() => {
		let newsdocs = await News.find({}, null, {
				limit: 6
			},
			(err, docs) => {
				if (err) {
					console.log(err);
					return next();
				}
			});
		let mcdocs = await MainContent.findByCode(2);
		await res.status(200).render('../views/news/news.ejs', {
			title: mcdocs.title,
			describe: mcdocs.describe,
			docs: newsdocs
		});
	})();
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