var mongoose = require("mongoose");

var IncrementSchema = new mongoose.Schema({
	index: {
		type: Number,
		default: 0
	}
});

mongoose.model("Increment", IncrementSchema);