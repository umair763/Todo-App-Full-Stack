// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const app = express();

// const userRoutes = require("./routes/userRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const { session } = require("passport");

// const corsOptions = {
//     origin: ["https://todo-app-full-stack-frontend.vercel.app"], // Add frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow OPTIONS for preflight
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
// };

// app.use(cors(corsOptions));

// // Explicitly handle OPTIONS preflight requests
// app.options("*", cors(corsOptions)); // Respond to all OPTIONS requests

// app.use((req, res, next) => {
//     res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//     res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//     res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
//     next();
// });
// app.use(session({ secret: "2834903284230984209389328938", resave: false, saveunitilized: true }));

// app.use(cors());
// app.use(bodyParser.json());

// // Set a larger limit for JSON and URL-encoded data
// app.use(express.json({ limit: "1gb" })); // For JSON payloads
// app.use(express.urlencoded({ limit: "1gb", extended: true })); // For URL-encoded data

// const PORT = process.env.PORT || 5000;

// // const MONGO_URI = "mongodb://127.0.0.1:27017/todoapp";
// const MONGO_URI =
//     process.env.MONGO_URI ||
//     "mongodb+srv://MuhammadUmair:umair@11167@cluster0.jjtx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todoapp";

// // Connect to MongoDB
// mongoose
//     .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected successfully"))
//     .catch((err) => console.error("MongoDB connection error:", err));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const User = require("./models/userModel"); // Assuming the user model is here
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Adjust frontend URL
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    // Generate JWT token on successful authentication
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Authentication successful", token });
});

// Manual Login (email + password)
app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate user credentials
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password (hashed)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

// Profile Route (Protected by JWT)
app.get("/api/users/profile", async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Return user profile
        res.json({
            username: user.username,
            email: user.email,
            picture: user.picture,
            gender: user.gender,
            occupation: user.occupation,
            organization: user.organization,
        });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/todoapp", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
