'use strict';

let config = require('config-lite');
let mongoose = require('mongoose');

module.exports = function() {
	mongoose.Promise = global.Promise;
	let db = mongoose.connect(config.mongodb);
	require('../models/daily.client.model');
	require('../models/daily.increment.model');
	require('../models/news.client.model');
	require('../models/news.increment.model');
	require('../models/user.server.model');
	return db;
}