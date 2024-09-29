const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Task = require("../models/Task.js"); // Use require instead of import

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/todoapp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Routes

// Get all tasks
app.get("/tasks", async (req, res) => {
	try {
		const tasks = await Task.find(); // Retrieve all tasks from MongoDB
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
	}
});

// Add a new task
app.post("/tasks", async (req, res) => {
	try {
		const { color, task, date, time } = req.body;

		if (!color || !task || !date || !time) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const newTask = new Task({
			color,
			task,
			date,
			time,
			status: false, // Default status as false
		});

		const savedTask = await newTask.save(); // Save the task to MongoDB
		res.status(201).json(savedTask); // Respond with the newly added task
	} catch (err) {
		res.status(500).json({ message: "Failed to add task", error: err.message });
	}
});

// Delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
	console.log("Task ID to delete:", req.params.id); // Log the task ID to verify

	try {
		const { id } = req.params; // Extract the ID from the URL parameters
		const deletedTask = await Task.findByIdAndDelete(id); // Find and delete task by its ID

		if (!deletedTask) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json({ message: "Task deleted successfully" });
	} catch (err) {
		console.error("Error deleting task:", err.message); // Log the actual error
		res.status(500).json({ message: "Failed to delete task", error: err.message });
	}
});

// Server running on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
