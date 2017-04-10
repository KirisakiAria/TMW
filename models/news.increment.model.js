'use strict';

let mongoose = require('mongoose');

let NewsIncrementSchema = new mongoose.Schema({
	index: {
		type: Number,
		default: 0
	}
});
NewsIncrementSchema.statics.addOne = function(doc,next) {
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
mongoose.model('NewsIncrement', NewsIncrementSchema);