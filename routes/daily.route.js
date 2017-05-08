'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MainContent = mongoose.model('MainContent');
const Daily = mongoose.model('Daily');


//日志列表页
router.get('/', (req, res, next) => {
	var aa = new MainContent({
		id: 1,
		title: 'DAILY', //英文标题
		describe: '书卷多情似故人', //中文信息
		bgsrc: '', //背景路径
		author: 'admin', //作者
		editor: 'admin', //修改人
		time:new Date() //发表时间
	});
	aa.save();
	(async() => {
		let dailydocs = await Daily.find({}, null, {
				limit: 9
			},
			(err, docs) => {
				if (err) {
					console.log(err);
					return next();
				}
			});
		let mcdocs = await MainContent.findByCode(1);
		await res.status(200).render('../views/daily/daily.ejs', {
			title: mcdocs.title,
			describe: mcdocs.describe,
			docs: dailydocs
		});
	})();
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