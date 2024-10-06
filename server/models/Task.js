const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	color: {
		type: String,
		required: true,
	},
	task: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
	user: {
		// New field to associate task with user
		type: mongoose.Schema.Types.ObjectId,
		ref: "loginusers", // Reference to the loginusers collection
		required: true,
	},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
