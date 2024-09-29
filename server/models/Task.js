// Task.js
const mongoose = require("mongoose");
// import { Schema, model } from "mongoose";

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
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
