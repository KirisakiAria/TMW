'use strict';

const mongoose = require('mongoose');

const SecretCodeSchema = new mongoose.Schema({
	code: String
});

//查询代码
SecretCodeSchema.statics.findByCode = function(code) {
	return this.findOne({
		code: code
	}, function(err, doc) {
		if (err) {
			return console.log(err);
		}
		if (doc) {
			return doc;
		}
	});
}
mongoose.model('SecretCode', SecretCodeSchema);