var mongoose = require("mongoose");

var NewsSchema = new mongoose.Schema({
	titles:String, //短标题
	titlel:String, //长标题
	author:String, //作者
	listimg:String,//列表图片
	time:Date,     //发表时间
	content:String //内容
});

mongoose.model("News",NewsSchema);