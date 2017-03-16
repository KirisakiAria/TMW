var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var News = mongoose.model("News");
var Increment = mongoose.model("Increment");

var app = express();

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

//创建计数器实体，序列为0
var inc = new Increment({
	index: 0
});

inc.save(function(err, doc) {
	if (err) {
		return console.log(err);
	}
});
//添加新闻
router.post('/createnews', function(req, res, next) {
	var success = "发表成功！";
	if (req) {
		res.send(success);
	}
	//查询出实体
	Increment.findOne(function(err, doc) {
		if (err) {
			console.log(err);
			return;
		}
		//更新实体，index增加1
		Increment.update({
			index: doc.index
		}, {
			$inc: {
				index: 1
			}
		}, function(err, doc) {
			if (err) {
				return;
			}
			//再次查询实体，将查询结果的index字段赋给文章id
			Increment.findOne(function(err, doc) {
				var news = new News({
					id: doc.index,
					titles: req.body.titles,
					titlel: req.body.titlel,
					author: "admin",
					listimg: "none",
					time: new Date(),
					content: req.body.content
				});
				news.save(function(err) {
					if (err) {
						console.log(err);
						retrun;
					}
				});
			});
		});
	});
});

module.exports = router;