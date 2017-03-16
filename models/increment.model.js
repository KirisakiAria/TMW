var mongoose = require("mongoose");

var IncrementSchema = new mongoose.Schema({
	_id: {
		type: String,
		index: true
	},
	index: {
		type: Number,
		default: 0
	}
});

mongoose.model("Increment", IncrementSchema);
