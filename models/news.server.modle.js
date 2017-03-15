var mongoose = require("mongoose");

var NewsSchema = new mongoose.Schema({
	title:String,
	author:String,
	time:Date,
	content:String
});

mongoose.model("News",NewsSchema);