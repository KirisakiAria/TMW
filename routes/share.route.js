'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MainContent = mongoose.model('MainContent');
const Share = mongoose.model('Share');


//分享列表页
router.get('/', (req, res, next) => {
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