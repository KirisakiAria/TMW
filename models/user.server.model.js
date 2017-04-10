'use strict';

let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	avatar: String,
	authority: String
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