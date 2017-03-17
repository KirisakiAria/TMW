var config = require('config-lite');
var mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.createConnection();
	db.openSet(config.mongodb);
	require("../models/increment.model");
	require("../models/news.server.model");
	return db;
}