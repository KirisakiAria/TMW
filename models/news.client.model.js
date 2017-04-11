'use strict';

let mongoose = require('mongoose');

let NewsSchema = new mongoose.Schema({
	id: Number, //文章ID
	titles: String, //短标题
	titlel: String, //长标题
	author: String, //作者
	editor: String, //修改人
	listimg: String, //列表图片
	time: Date, //发表时间
	content: String //内容
});

//删除新闻
NewsSchema.statics.removeById = function(newsid, next, fn) {
	this.remove({
		id: newsid
	}, function(err) {
		if (err) {
			console.log(err);
			return next();
		} else {
			console.log('删除ID为' + newsid + '的文章');
			fn();
		}
	});
}

//批量删除新闻
NewsSchema.statics.removeByIdList = function(idList, next, fn) {
	this.remove({
		id: {
			$in: idList
		}
	}, function(err) {
		if (err) {
			console.log(err);
			return next();
		} else {
			idList.forEach(function(e, i) {
				console.log('删除ID为' + e + '的文章');
			});
			fn();
		}
	});
}
mongoose.model('News', NewsSchema);