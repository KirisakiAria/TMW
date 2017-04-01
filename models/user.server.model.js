'use strict';

let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	avatar:String,
	authority:String
});

mongoose.model('User',UserSchema);