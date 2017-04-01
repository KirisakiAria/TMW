'use strict';

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let User = mongoose.model('User');

router.post('/sign', function(req, res, err) {
	let username = req.body.username;
	let password = req.body.password;
	//先查一下用户名是不是已存在
	Increment.findOne({
		username: username
	}, function(err, doc) {
		if (err) {
			return console.log(err);
		}
		if (doc) {
			return res.send('用户名已存在！');
		}
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
	});
});