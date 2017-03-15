var config = require('config-lite');
var mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.mongodb);
	require("../models/news.server.modle.js");
	return db;
}