'use strict';

const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
	age:String
	imgsrc:String
	src:String
});

//删除分享
ShareSchema.statics.removeById = function(dailyid, next, fn) {
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
				console.log('删除ID为' + e + '的日志');
			});
			fn();
		}
	});
}
mongoose.model('Share', ShareSchema);