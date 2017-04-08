'use strict';

let mongoose = require('mongoose');

let NewsIncrementSchema = new mongoose.Schema({
	index: {
		type: Number,
		default: 0
	}
});

mongoose.model('NewsIncrement', NewsIncrementSchema);