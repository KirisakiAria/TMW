'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	avatar: String,
	authority: String,
	lastloginip:String,
	lastloginposition:String
});

UserSchema.statics.findByUsername = function(username) {
	return this.findOne({
		username: username
	}, function(err, doc) {
		if (err) {
			return console.log(err);
		}
		if (doc) {
			return doc;
		}
	});
}
mongoose.model('User', UserSchema);