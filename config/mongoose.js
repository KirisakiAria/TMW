'use strict';

const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');

module.exports = () => {
	mongoose.Promise = global.Promise;
	const db = mongoose.connect(config.mongodb);
	require('../models/maincontent.client.model');
	require('../models/daily.client.model');
	require('../models/daily.increment.model');
	require('../models/news.client.model');
	require('../models/news.increment.model');
	require('../models/share.client.model');
	require('../models/share.increment.model');
	require('../models/user.server.model');
	require('../models/secretcode.server.model');

	return db;
}