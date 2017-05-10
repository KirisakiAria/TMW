'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MainContent = mongoose.model('MainContent');


//分享列表页
router.get('/', (req, res, next) => {
	// var a = new MainContent({
	// 	id: 4,
	// 	title: 'MYSELF', //英文标题
	// 	describe: '', //中文信息
	// 	bgsrc: '', //背景路径
	// 	author: 'admin', //作者
	// 	editor: 'admin', //修改人
	// 	time: new Date() //发表时间
	// });
	// a.save();
	(async() => {
		let mcdocs = await MainContent.findByCode(4);
		await res.status(200).render('../views/myself/myself.ejs', {
			title: 'MYSELF'
		});
	})();
});

module.exports = router;