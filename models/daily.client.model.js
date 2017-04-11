'use strict';

const mongoose = require('mongoose');

const DailySchema = new mongoose.Schema({
	id: Number, //文章ID
	titles: String, //短标题
	titlel: String, //长标题
	author: String, //作者
	editor: String, //修改人
	listimg: String, //列表图片
	time: Date, //发表时间
	content: String //内容
});

//删除日志
DailySchema.statics.removeById = function(dailyid, next, fn) {
	this.remove({
		id: dailyid
	}, function(err) {
		if (err) {
			console.log(err);
			return next();
		} else {
			console.log('删除ID为' + dailyid + '的日志');
			fn();
		}
	});  
}

//批量删除日志
DailySchema.statics.removeByIdList = function(idList, next, fn) {
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
				console.log('删除ID为' + e + '的日志');
			});
			fn();
		}
	});
}
mongoose.model('Daily', DailySchema);