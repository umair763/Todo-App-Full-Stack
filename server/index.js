const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const Task = require("./models/Task");
const LoginUser = require("./models/loginUser");
const authenticator = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Connect to MongoDB
mongoose
	// .connect("mongodb://my-todo:L7Gli6e3fgtFtqJPvHHaCLLuDm4RaV0OpbU8qpipWlqQvp1beL5YRhxN9uTcbfTNkLXiQazzCoBaACDbpgUhdQ%3D%3D@my-todo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb/todoapp", {
	.connect("mongodb://127.0.0.1:27017/todoapp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.error("MongoDB connection error:", err));

// User Registration Route
app.post("/api/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const existingUser = await LoginUser.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const newUser = new LoginUser({ username, email, password: hashedPassword });
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error: error.message });
	}
});

// User Login Route
app.post("/api/auth/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await LoginUser.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error: error.message });
	}
});

app.get("/tasks", authenticator, async (req, res) => {
	try {
		// Fetch tasks only for the logged-in user (req.user contains the user's ID)
		const tasks = await Task.find({ user: req.user });
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
	}
});

app.post("/tasks", authenticator, async (req, res) => {
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
			user: req.user, // Associate task with the logged-in user
		});

		const savedTask = await newTask.save(); // Save the task to MongoDB
		res.status(201).json(savedTask); // Respond with the newly added task
	} catch (err) {
		res.status(500).json({ message: "Failed to add task", error: err.message });
	}
});

// Delete Task (DELETE request)
app.delete("/tasks/:id", authenticator, async (req, res) => {
	try {
		const { id } = req.params;

		// Find the task and ensure it belongs to the logged-in user
		const task = await Task.findOne({ _id: id, user: req.user });

		if (!task) {
			return res.status(404).json({ message: "Task not found or you do not have permission to delete it" });
		}

		await Task.findByIdAndDelete(id); // Delete the task if it belongs to the logged-in user
		res.json({ message: "Task deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Failed to delete task", error: err.message });
	}
});

// Server running on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
