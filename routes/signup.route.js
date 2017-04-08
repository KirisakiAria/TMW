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
		}
	})();
});

module.exports = router;