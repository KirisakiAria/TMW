'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MainContent = mongoose.model('MainContent');
const Share = mongoose.model('Share');


//分享列表页
router.get('/', (req, res, next) => {
	var a = new MainContent({
		id: 3,
		title: 'SHARE', //英文标题
		describe: '赠人玫瑰 手有余香', //中文信息
		bgsrc: '', //背景路径
		author: 'admin', //作者
		editor: 'admin', //修改人
		time: new Date() //发表时间
	});
	a.save();
	(async() => {
		let sharedocs = await Share.find({},
			(err, docs) => {
				if (err) {
					console.log(err);
					return next();
				}
			});
		let mcdocs = await MainContent.findByCode(3);
		await res.status(200).render('../views/share/share.ejs', {
			title: mcdocs.title,
			describe: mcdocs.describe,
			docs: sharedocs,
			bgurl:'../img/share.jpg',
			movebg:'../img/camera.jpg'
		});
	})();
});

module.exports = router;