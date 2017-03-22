var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	avatar:String,
	authority:String
});

mongoose.model("User",UserSchema);