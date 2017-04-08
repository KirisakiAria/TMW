'use strict';

let mongoose = require('mongoose');

let DailySchema = new mongoose.Schema({
	id:Number,     //文章ID
	titles:String, //短标题
	titlel:String, //长标题
	author:String, //作者
	listimg:String,//列表图片
	time:Date,     //发表时间
	content:String //内容
});

mongoose.model('Daily',DailySchema);