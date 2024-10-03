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

// Route to get protected tasks (only accessible if user is authenticated)
app.get("/tasks", authenticator, async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
	}
});

// Server running on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
