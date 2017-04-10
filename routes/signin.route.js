'use strict';

let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let mongoose = require('mongoose');
let User = mongoose.model('User');

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
					return res.send("用户名不存在！请检查您的输入");
				} else {
					password = sha512.digest(password).toString();
					if (re.password !== password) {
						return res.send("密码错误！");
					}
					req.session.user = username;
					res.send("/tmwcms");
				}
			})();
		} catch (e) {
			console.log(e);
			next();
		}
	})();
});

module.exports = router;