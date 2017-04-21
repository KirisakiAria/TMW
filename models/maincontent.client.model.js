'use strict';

const mongoose = require('mongoose');

const MainContentSchema = new mongoose.Schema({
	id: String,
	title: String, //英文标题
	describe: String, //中文信息
	bgsrc:String, //背景路径
	author: String, //作者
	editor: String, //修改人
	time: Date //发表时间
});

//查询主内容
MainContentSchema.statics.findByCode = function(id) {
	return this.findOne({
		id: id
	}, function(err, doc) {
		if (err) {
			return console.log(err);
		}
		if (doc) {
			return doc;
		}
	});
}

mongoose.model('MainContent', MainContentSchema);