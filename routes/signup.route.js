'use strict';

let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let sha512 = crypto.createHash('sha512');
let mongoose = require('mongoose');
let User = mongoose.model('User');

router.get('/', function(req, res, err) {
	res.status(200).render('../views/server/signup.ejs');
})

router.post('/sign', function(req, res, err) {
	let username = req.body.username;
	let password = req.body.password;
	try {
		if (!(username.length >= 1 && username.length <= 16)) {
			throw new Error('用户名请在1-16个字符之内');
		}
		if (!(password.length >= 1 && password.length <= 16)) {
			throw new Error('密码请在1-16个字符之内');
		}
	} catch (e) {
		console.log(e);
		req.flash('error', e.message);
		return res.redirect('/signup');
	}

	//先查一下用户名是不是已存在
	(async function() {
		try {
			let re = await User.findOne({
				username: username
			}, function(err, doc) {
				if (err) {
					return console.log(err);
				}
				if (doc) {
					return doc;
				}
			});
			await (() => {
				if (re) {
					res.send("用户名已存在");
				} else {
					password = sha512.digest(password);
					console.log(password);
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
						res.send('注册成功！');
					});
				}
			})();
		} catch (e) {
			console.log(e);
		}
	})();
});

module.exports = router;