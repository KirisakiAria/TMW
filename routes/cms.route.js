'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MainContent = mongoose.model('MainContent');
const News = mongoose.model('News');
const Daily = mongoose.model('Daily');
const Share = mongoose.model('Daily');
const NewsIncrement = mongoose.model('NewsIncrement');
const DailyIncrement = mongoose.model('DailyIncrement');
const ShareIncrement = mongoose.model('ShareIncrement');
const checkLogin = require('../lib/checkLogin').checkLogin;
const checkAuth = require('../lib/checkLogin').checkAuth;

//cms
router.get('/', checkLogin, (req, res, next) => {
	res.status(200).render('../views/server/cms.ejs', {
		username: req.session.user.username
	});
});

//登出
router.get('/signout', (req, res, next) => {
	req.session.user = null;
	return res.send('success');
});

/*------主内容------*/

//查看主内容
router.get('/maincontent', checkLogin, (req, res, next) => {
	MainContent.find({}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//编辑单条主内容
router.get('/maincontentedit/:mcid', checkLogin, (req, res, next) => {
	let mcid = req.params.mcid;
	MainContent.findOne({
		id: mcid
	}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//编辑单条主内容
router.post('/maincontent/:mcid/edit', checkLogin, (req, res, next) => {
	let mcid = req.params.mcid;
	MainContent.updateOne({
			id: mcid
		}, {
			$set: {
				title: req.body.entitle,
				describe: req.body.describe,
				bgsrc: "",
				editor: req.session.user.username,
				time: new Date()
			}
		},
		(err) => {
			if (err) {
				return console.log(err);
			}
			return res.send('修改成功！')
		});
});

/*------新闻------*/

//查看所有新闻
router.get('/shownews', checkLogin, (req, res, next) => {
	News.find({}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//编辑单条新闻
router.post('/editnews/:newsid', checkLogin, (req, res, next) => {
	let newsid = req.params.newsid;
	News.findOne({
		id: newsid
	}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//删除新闻
router.post('/news/:newsid/del', checkLogin, (req, res, next) => {
	let newsid = req.params.newsid;
	News.removeById(newsid, next, () => {
		res.send('删除成功！');
	});
});

//批量删除新闻
router.post('/news/:list/mutidel/', checkLogin, (req, res, next) => {
	let list = req.params.list.split(',');
	News.removeByIdList(list, next, () => {
		res.send('删除成功！');
	});
});

//先查一下有没有计数器
(async() => {
	try {
		let doc = await NewsIncrement.find({}, (err, doc) => {
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
				inc.save((err, doc) => {
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
router.post('/news/create', checkLogin, (req, res, next) => {
	(async() => {
		try {
			let doc = await NewsIncrement.findOne((err, doc) => {
				if (err) {
					console.log(err);
					return next();
				} else {
					return doc;
				}
			});
			await NewsIncrement.addOne(doc, next);
			doc = await NewsIncrement.findOne((err, doc) => {
				if (err) {
					console.log(err);
					return next();
				} else {
					return doc;
				}
			});
			await NewsIncrement.findOne((err, doc) => {
				console.log(req.body);
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
				news.save((err) => {
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
router.post('/news/:newsid/edit', checkLogin, (req, res, next) => {
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
		(err) => {
			if (err) {
				return console.log(err);
			}
			return res.send('修改成功！')
		});
});

/*------新闻结束------*/

/*------日志------*/

//查看所有日志
router.get('/showdailies', checkLogin, (req, res, next) => {
	Daily.find({}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//编辑单条日志
router.post('/editdaily/:dailyid', checkLogin, (req, res, next) => {
	let dailyid = req.params.dailyid;
	Daily.findOne({
		id: dailyid
	}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

//删除日志
router.post('/daily/:dailyid/del', checkLogin, (req, res, next) => {
	let dailyid = req.params.dailyid;
	Daily.removeById(dailyid, next, () => {
		res.send('删除成功！');
	});
});

//批量删除日志
router.post('/daily/:list/mutidel/', checkLogin, (req, res, next) => {
	let list = req.params.list.split(',');
	Daily.removeByIdList(list, next, () => {
		res.send('删除成功！');
	});
});

(async() => {
	try {
		let doc = await DailyIncrement.find({}, (err, doc) => {
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
				inc.save((err, doc) => {
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
router.post('/daily/create', checkLogin, (req, res, next) => {
	(async() => {
		try {
			let doc = await DailyIncrement.findOne((err, doc) => {
				if (err) {
					console.log(err);
					return next();
				} else {
					return doc;
				}
			});
			await DailyIncrement.addOne(doc, next);
			doc = await DailyIncrement.findOne((err, doc) => {
				if (err) {
					console.log(err);
					return next();
				} else {
					return doc;
				}
			});
			await DailyIncrement.findOne((err, doc) => {
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
				daily.save((err) => {
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
router.post('/daily/:dailyid/edit', checkLogin, (req, res, next) => {
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
		(err) => {
			if (err) {
				return console.log(err);
			}
			return res.send('修改成功！')
		});
});

/*------日志结束------*/

/*------分享------*/

//查看所有分享
router.get('/showshare', checkLogin, (req, res, next) => {
	Share.find({}, (err, docs) => {
		if (err) {
			console.log(err);
			return next();
		} else {
			res.json(docs);
		}
	});
});

(async() => {
	try {
		let doc = await ShareIncrement.find({}, (err, doc) => {
			if (err) {
				console.log(err);
				return;
			} else {
				return doc;
			}
		});
		await (() => {
			if (!doc[0]) {
				let inc = new ShareIncrement({
					index: 0
				});
				inc.save((err, doc) => {
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

/*------分享结束------*/

module.exports = router;