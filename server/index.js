const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const corsOptions = {
    origin: ["https://todo-app-full-stack-frontend.vercel.app"], // Add frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow OPTIONS for preflight
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

// Explicitly handle OPTIONS preflight requests
app.options("*", cors(corsOptions)); // Respond to all OPTIONS requests

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set a larger limit for JSON and URL-encoded data
app.use(express.json({ limit: "1gb" })); // For JSON payloads
app.use(express.urlencoded({ limit: "1gb", extended: true })); // For URL-encoded data

const PORT = process.env.PORT || 5000;

// const MONGO_URI = "mongodb://127.0.0.1:27017/todoapp";
const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb+srv://MuhammadUmair:umair@11167@cluster0.jjtx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todoapp";

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
