'use strict';

const express = require('express');
const router = express.Router();

//主页
router.get('/', (req, res, next) => {
	res.locals = {
		title: "That's My Way",
		bgurl:'../img/index.jpg'
	}
	res.status(200).render('../views/index/index.ejs');
});

module.exports = router;