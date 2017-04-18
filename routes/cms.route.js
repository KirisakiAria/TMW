'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const News = mongoose.model('News');
const Daily = mongoose.model('Daily');
const NewsIncrement = mongoose.model('NewsIncrement');
const DailyIncrement = mongoose.model('DailyIncrement');
const checkLogin = require('../lib/checkLogin').checkLogin;
const checkAuth = require('../lib/checkLogin').checkAuth;

//cms
router.get('/', checkLogin, function(req, res, next) {
	console.log(req.connection.remoteAddress);
	res.status(200).render('../views/server/cms.ejs', {
		username: req.session.user.username
	});
});

//登出
router.get('/signout', function(req, res, next) {
	req.session.user = null;
	return res.send('success');
});

/*------新闻------*/

//查看所有新闻
router.get('/shownews', checkLogin, function(req, res, next) {
	News.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//编辑单条新闻
router.post('/editnews/:newsid', checkLogin, function(req, res, next) {
	let newsid = req.params.newsid;
	News.findOne({
		id: newsid
	}, function(err, docs) {
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
					author: req.session.user.username,
					editor: req.session.user.username,
					listimg: 'none',
					time: new Date(),
					content: req.body.content
				});
				news.save(function(err) {
					if (err) {
						console.log(err);
						return next();
					}
					res.send('发表成功！')
				});
			});
		} catch (e) {
			console.log(e);
			next();
		}
	})();
});

//编辑新闻
router.post('/news/:newsid/edit', checkLogin, function(req, res, next) {
	let newsid = req.params.newsid;
	News.updateOne({
			id: newsid
		}, {
			$set: {
				titles: req.body.titles,
				titlel: req.body.titlel,
				editor: req.session.user.username,
				time: new Date(),
				content: req.body.content,
			}
		},
		function(err) {
			if (err) {
				return console.log(err);
			}
			return res.send('修改成功！')
		});
});

/*------新闻结束------*/

/*------日志------*/

//查看所有日志
router.get('/showdailies', checkLogin, function(req, res, next) {
	Daily.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//编辑单条日志
router.post('/editdaily/:dailyid', checkLogin, function(req, res, next) {
	let dailyid = req.params.dailyid;
	Daily.findOne({
		id: dailyid
	}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//删除日志
router.post('/daily/:dailyid/del', checkLogin, function(req, res, next) {
	let dailyid = req.params.dailyid;
	Daily.removeById(dailyid, next, function() {
		res.send('删除成功！');
	});
});

//批量删除日志
router.post('/daily/:list/mutidel/', checkLogin, function(req, res, next) {
	let list = req.params.list.split(',');
	Daily.removeByIdList(list, next, function() {
		res.send('删除成功！');
	});
});

(async function() {
	try {
		let doc = await DailyIncrement.find({}, function(err, doc) {
			if (err) {
				console.log(err);
				return;
			} else {
				return doc;
			}
		});
		await (() => {
			if (!doc[0]) {
				let inc = new DailyIncrement({
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

//添加日志
router.post('/createdaily', checkLogin, function(req, res, next) {
	(async function() {
		try {
			let doc = await DailyIncrement.findOne(function(err, doc) {
				if (err) {
					console.log(err);
					return next();
				} else {
					return doc;
				}
			});
			await DailyIncrement.addOne(doc, next);
			doc = await DailyIncrement.findOne(function(err, doc) {
				if (err) {
					console.log(err);
					return next();
				} else {
					return doc;
				}
			});
			await DailyIncrement.findOne(function(err, doc) {
				let daily = new Daily({
					id: doc.index,
					titles: req.body.titles,
					titlel: req.body.titlel,
					author: req.session.user.username,
					editor: req.session.user.username,
					listimg: 'none',
					time: new Date(),
					content: req.body.content
				});
				daily.save(function(err) {
					if (err) {
						console.log(err);
						return next();
					}
					res.send('发表成功！')
				});
			});
		} catch (e) {
			console.log(e);
			next();
		}
	})();
});

//编辑日志
router.post('/daily/:dailyid/edit', checkLogin, function(req, res, next) {
	let dailyid = req.params.dailyid;
	Daily.updateOne({
			id: dailyid
		}, {
			$set: {
				titles: req.body.titles,
				titlel: req.body.titlel,
				editor: req.session.user.username,
				time: new Date(),
				content: req.body.content,
			}
		},
		function(err) {
			if (err) {
				return console.log(err);
			}
			return res.send('修改成功！')
		});
});

/*------日志结束------*/

module.exports = router;