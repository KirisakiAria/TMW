var config = require('config-lite');
var mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.mongodb);
	require("../models/increment.model");
	require("../models/news.server.model");
	return db;
}