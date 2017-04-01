'use strict';

let config = require('config-lite');
let mongoose = require('mongoose');

module.exports = function() {
	let db = mongoose.connect(config.mongodb);
	require('../models/increment.model');
	require('../models/news.server.model');
	require('../models/user.server.model');
	return db;
}