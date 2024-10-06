const mongoose = require("mongoose");

const loginUserSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const LoginUser = mongoose.model("loginusers", loginUserSchema);

module.exports = LoginUser;
