const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/userModel");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Multer configuration for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// User registration
exports.registerUser = [
    upload.single("picture"), // Handle image uploads
    async (req, res) => {
        try {
            // Debugging logs to see what's received
            console.log("Request Body:", req.body);
            console.log("Password:", req.body.password);
            console.log("Picture:", req.file);

            const { username, gender, occupation, organization, email, password } = req.body;

            // Ensure all fields are present
            if (!username || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // Handle the picture field (stored as Buffer)
            const uploadPicture = req.file ? req.file.buffer : null; // Handle image

            // Create a new user object
            const newUser = new User({
                username,
                gender,
                email,
                occupation,
                organization,
                password: hashedPassword,
                picture: uploadPicture,
            });

            // Save the user to the database
            await newUser.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error("Registration error:", error); // Log error details
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
        const userId = req.user; // Get user ID from JWT
        console.log("Fetching profile for user ID:", userId); // Add logging

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found in request" });
        }

        const user = await User.findById(userId).select("-password"); // Fetch user and exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User found:", user); // Log user details

        // Convert the picture from Buffer to base64 if it exists
        let pictureBase64 = null;
        if (user.picture) {
            pictureBase64 = user.picture.toString("base64"); // Convert buffer to base64 string
            console.log("Base64 image size:", pictureBase64.length); // Log image size for debugging
        }

        // Return user details including base64 image
        return res.status(200).json({
            username: user.username,
            email: user.email,
            gender: user.gender,
            occupation: user.occupation,
            organization: user.organization,
            picture: pictureBase64, // Send base64-encoded image
        });
    } catch (error) {
        console.error("Error fetching user profile:", error); // Log any errors
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};
