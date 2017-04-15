'use strict';

const config = require('config-lite');
const mongoose = require('mongoose');

module.exports = function() {
	mongoose.Promise = global.Promise;
	let db = mongoose.connect(config.mongodb);
	require('../models/daily.client.model');
	require('../models/daily.increment.model');
	require('../models/news.client.model');
	require('../models/news.increment.model');
	require('../models/user.server.model');
	require('../models/secretcode.server.model');
	return db;
}