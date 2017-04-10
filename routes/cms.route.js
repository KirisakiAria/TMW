'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let News = mongoose.model('News');
let NewsIncrement = mongoose.model('NewsIncrement');
let checkLogin = require('../lib/checkLogin').checkLogin;
let checkAuth = require('../lib/checkLogin').checkAuth;

//cms
router.get('/', checkLogin, function(req, res, next) {
	res.status(200).render('../views/server/cms.ejs', {
		username: req.session.user
	});
});

//登出
router.get('/signout', function(req, res, next) {
	req.session.user = null;
	return res.send("success");
});

//查看新闻
router.get('/watchnews', checkLogin, function(req, res, next) {
	News.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//删除新闻
router.post('/news/:newsid/del', checkLogin, function(req, res, next) {
	let newsid = req.params.newsid;
	News.removeById(newsid, next, function() {
		res.send('删除成功！');
	});
});

//批量删除新闻
router.post('/news/:list/mutidel/', checkLogin, function(req, res, next) {
	let list = req.params.list.split(',');
	News.removeByIdList(list, next, function() {
		res.send('删除成功！');
	});
});

//先查一下有没有计数器
(async function() {
	try {
		let doc = await NewsIncrement.find({}, function(err, doc) {
			if (err) {
				console.log(err);
				return;
			} else {
				return doc;
			}
		});
		await (() => {
			if (!doc[0]) {
				let inc = new NewsIncrement({
					index: 0
				});
				inc.save(function(err, doc) {
					if (err) {
						return console.log(err);
					}
				});
			}
		})();
	} catch (e) {
		console.log(e);
	}
})();

//添加新闻
router.post('/createnews', checkLogin, function(req, res, next) {
	(async function() {
		try {
			let doc = await NewsIncrement.findOne(function(err, doc) {
				if (err) {
					console.log(err);
					return next();
				} else {
					return doc;
				}
			});
			await NewsIncrement.addOne(doc, next);
			doc = await NewsIncrement.findOne(function(err, doc) {
				if (err) {
					console.log(err);
					return next();
				} else {
					return doc;
				}
			});
			await NewsIncrement.findOne(function(err, doc) {
				let news = new News({
					id: doc.index,
					titles: req.body.titles,
					titlel: req.body.titlel,
					author: 'admin',
					listimg: 'none',
					time: new Date(),
					content: req.body.content
				});
				news.save(function(err) {
					if (err) {
						console.log(err);
						return next();
					}
					res.send("发表成功！")
				});
			});
		} catch (e) {
			console.log(e);
			next();
		}
	})();
});

//编辑新闻
router.post('/news/:newsid/edit', checkLogin, function(req, res, next) {})
module.exports = router;