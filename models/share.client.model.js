'use strict';

const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
	title: String, //歌名
	singer: String //歌手
	details: String, //详情
	href: String, //链接
	imgsrc: String, //图片
	time: Date //创建时间
});

//删除分享
ShareSchema.statics.removeById = function(shareid, next, fn) {
	this.remove({
		id: shareid
	}, function(err) {
		if (err) {
			console.log(err);
			return next();
		} else {
			console.log(`删除ID为${shareid}的分享`);
			fn();
		}
	});
}

//批量删除分享
ShareSchema.statics.removeByIdList = function(idList, next, fn) {
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
				console.log(`删除ID为${e}的分享`);
			});
			fn();
		}
	});
}
mongoose.model('Share', ShareSchema);