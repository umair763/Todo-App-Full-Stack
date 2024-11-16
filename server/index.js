const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("passport");
require("./middleware/passport"); // Import Passport configuration
const session = require("express-session");
// Enable sessions for OAuth
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'session_secret',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set a larger limit for JSON and URL-encoded data
app.use(express.json({ limit: "1gb" })); // For JSON payloads
app.use(express.urlencoded({ limit: "1gb", extended: true })); // For URL-encoded data

const PORT = process.env.PORT || 5000;

// const MONGO_URI = "mongodb://127.0.0.1:27017/todoapp";
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://MuhammadUmair:umair@11167@cluster0.jjtx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todoapp";

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
