"use strict";

let express = require("express");
let router = express.Router();

//主页
router.get('/', function(req, res, next) {
	res.locals = {
		title: "That's My Way"
	}
	res.status(200).render('../views/index/index.ejs');
});

module.exports = router;