var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var News = mongoose.model("News");

var app = express();

var addAndUpdateKeys = function(keyId, callback) {
	Keys.findById(keyId, function(err, doc) {
		if (!err && !doc) {
			var obj = {};
			obj._id = keyId;
			var keys = new Keys(obj);
			keys.save(function(err, doc) {
				if (err) {
					callback(null);
					return;
				}
				callback(doc);
			})
		} else {
			Keys.findByIdAndUpdate(keyId, {
				$inc: {
					key: 1
				}
			}, function(err, doc) {
				if (err) {
					callback(null);
					return;
				}
				callback(doc);
			})
		}
	});
};

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

//添加新闻
router.post('/createnews', function(req, res, next) {
	var success = "发表成功！";
	if (req) {
		res.send(success);
	}
	var news = new News({
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
	})
});

module.exports = router;