'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Share = mongoose.model('Share');


//分享列表页
router.get('/', (req, res, next) => {
	Share.find({},
		(err, docs) => {
			if (err) {
				console.log(err);
				return next();
			}
			res.status(200).render('../views/share/share.ejs', {
				title: 'Share',
				docs: docs
			});
		});
});

module.exports = router;