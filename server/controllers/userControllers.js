const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/userModel");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Multer configuration for file uploads (store files in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// User registration
exports.registerUser = [
    upload.single("picture"),
    async (req, res) => {
        const { username, gender, occupation, organization, email, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Validate the password
            if (!password || typeof password !== "string") {
                return res.status(400).json({ message: "Password is required and must be a string" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // Handle the picture field (stored as Buffer)
			const picture = req.file && req.file.buffer ? req.file.buffer : null;

            // Create a new user object
            const newUser = new User({
                username,
                gender,
                email,
                occupation,
                organization,
                password: hashedPassword,
                picture,
            });

            // Save the user to the database
            await newUser.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error registering user", error: error.message || "Unknown error occurred" });
        }

    },
];

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

        // Send the token to the client
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

//profile
exports.profile = async (req, res) => {
    try {
        // Ensure the user is authenticated by checking the token
        const userId = req.user && req.user.userId; // Ensure req.user is properly set
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user details (excluding password)
        res.json({
            username: user.username,
            email: user.email,
            picture: user.picture ? user.picture.toString("base64") : null, // Convert picture to base64
            gender: user.gender,
            occupation: user.occupation,
            organization: user.organization,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
    }
};
