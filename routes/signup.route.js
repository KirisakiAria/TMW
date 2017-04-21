'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
const User = mongoose.model('User');
const SecretCode = mongoose.model('SecretCode');

router.get('/', (req, res, next) => {
	res.status(200).render('../views/server/signup.ejs');
});

//注册请求
router.post('/sign', (req, res, next) => {
	if (config.open) {
		let sha512 = crypto.createHash('sha512');
		let username = req.body.username;
		let password = req.body.password;
		let secretcode = req.body.secretcode;
		(async() => {
			try {
				//验证神秘代码
				let code = await SecretCode.findByCode(secretcode);
				if (!code) {
					return res.send('神秘代码有误！');
				}
				//查一下用户名是不是已存在
				let re2 = await User.findByUsername(username);
				await (() => {
					if (re2) {
						res.send('用户名已存在');
					} else {
						password = sha512.digest(password).toString();
						let user = new User({
							username: username,
							password: password,
							avatar: '',
							authority: 'normal',
							lastloginip: req.connection.remoteAddress
						});
						user.save((err) => {
							if (err) {
								console.log(err);
								return;
							}
							res.send('注册成功！请登录');
						});
					}
				})();
			} catch (e) {
				console.log(e);
				next();
			}
		})();
	} else {
		res.send('抱歉，现在不开放注册！');
	}
});

module.exports = router;