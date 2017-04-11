'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', function(req, res, next) {
	res.status(200).render('../views/server/signup.ejs');
})

//注册请求
router.post('/sign', function(req, res, next) {
	let sha512 = crypto.createHash('sha512');
	let username = req.body.username;
	let password = req.body.password;
	//先查一下用户名是不是已存在
	(async function() {
		try {
			let re = await User.findByUsername(username);
			await (() => {
				if (re) {
					res.send("用户名已存在");
				} else {
					password = sha512.digest(password).toString();
					let user = new User({
						username: username,
						password: password,
						avatar: '',
						authority: 'normal'
					});
					user.save(function(err) {
						if (err) {
							console.log(err);
							return;
						}
						req.session.user = username;
						res.send("注册成功！请登录");
					});
				}
			})();
		} catch (e) {
			console.log(e);
			next();
		}
	})();
});

module.exports = router;