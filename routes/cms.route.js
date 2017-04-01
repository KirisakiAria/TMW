'use strict';

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let News = mongoose.model('News');
let Increment = mongoose.model('Increment');

let app = express();

//cms
router.get('/', function(req, res, next) {
	res.status(200).render('../views/server/cms.ejs');
});

//查看新闻
router.get('/watchnews', function(req, res, next) {
	News.find({}, function(err, docs) {
		if (err) {
			console.log(err);
			return next();
		}
		res.json(docs);
	});
});
//删除新闻
router.post('/news/:newsid/del', function(req, res, next) {
	//获取:xxx
	let newsid = req.params.newsid;
	News.remove({
		id: newsid
	}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('删除ID为' + newsid + '的文章');
			res.send('删除成功！');
		}
	});

});
//批量删除新闻
router.post('/news/muldel/:list', function(req, res, next) {
	//获取:xxx
	let list = req.params.list.split(',');
	News.remove({
		id: {
			$in: list
		}
	}, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send('批量删除成功！');
		}
	});
});
//先查一下有没有计数器
Increment.find({}, function(err, doc) {
	if (err) {
		console.log(err);
		return;
	}
	//如果没有则创建计数器实体，index设置为0
	if (!doc[0]) {
		let inc = new Increment({
			index: 0
		});
		inc.save(function(err, doc) {
			if (err) {
				return console.log(err);
			}
		});
	}
});
//添加新闻

router.post('/createnews', function(req, res, next) {
	let promise = new Promise(function(resolve, reject) {
		Increment.findOne(function(err, doc) {
			if (err) {
				reject(error);
			} else {
				resolve(doc);
			}
		});
	});
	promise.then(function(doc) {
		Increment.update({
			index: doc.index
		}, {
			$inc: {
				index: 1
			}
		}, function(err, doc) {
			if (err) {
				return console.log(err);
			} else {
				return doc;
			}
			console.log(typeof step1);
		});
	}).catch(function(error) {
		console.log('发生错误！', error);
	}).then(function(doc) {
		Increment.findOne(function(err, doc) {
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
					return;
				}
				res.send('发表成功！');
			});
		});
	}).catch(function(error) {
		console.log('发生错误！', error);
	});
});

module.exports = router;