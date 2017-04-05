'use strict';

let config = require('config-lite');
let mongoose = require('mongoose');

module.exports = function() {
	mongoose.Promise = global.Promise;
	let db = mongoose.connect(config.mongodb);
	require('../models/increment.model');
	require('../models/news.server.model');
	require('../models/user.server.model');
	return db;
}