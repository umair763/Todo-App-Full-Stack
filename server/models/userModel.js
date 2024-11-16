// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     gender: { type: String },
//     occupation: { type: String },
//     organization: { type: String },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     picture: { type: Buffer }, // Store image as Buffer in MongoDB
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true }, // For Google login
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String }, // Store picture URL from Google
    password: { type: String }, // In case of manual registration
    gender: { type: String },
    occupation: { type: String },
    organization: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
