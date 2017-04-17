'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', function(req, res, next) {
	res.status(200).render('../views/server/signin.ejs');
});

//登录请求
router.post('/sign', function(req, res, next) {
	let sha512 = crypto.createHash('sha512');
	let username = req.body.username;
	let password = req.body.password;
	//先查一下用户名是不是已存在
	(async function() {
		try {
			let re = await User.findByUsername(username);
			await (() => {
				if (!re) {
					return res.send('用户名不存在！请检查您的输入');
				} else {
					password = sha512.digest(password).toString();
					if (re.password !== password) {
						return res.send('密码错误！');
					}
					re.password = "";
					req.session.user = re;
					User.update({
						username: username
					}, {
						$set: {
							lastloginip: req.connection.remoteAddress
						}
					}, function(err) {
						if (err) {
							console.log(err);
						}
					});
					res.send('/tmwcms');
				}
			})();
		} catch (e) {
			console.log(e);
			next();
		}
	})();
});

module.exports = router;