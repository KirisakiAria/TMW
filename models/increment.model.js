'use strict';

let mongoose = require('mongoose');

let IncrementSchema = new mongoose.Schema({
	index: {
		type: Number,
		default: 0
	}
});

mongoose.model('Increment', IncrementSchema);