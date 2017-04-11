'use strict';

const mongoose = require('mongoose');

const DailyIncrementSchema = new mongoose.Schema({
	index: {
		type: Number,
		default: 0
	}
});

DailyIncrementSchema.statics.addOne = function(doc,next) {
	this.update({
		index: doc.index
	}, {
		$inc: {
			index: 1
		}
	}, function(err) {
		if (err) {
			console.log(err);
			return next();
		}
	});
}

mongoose.model('DailyIncrement', DailyIncrementSchema);