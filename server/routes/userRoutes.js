const express = require("express");
const { registerUser, loginUser, profile } = require("../controllers/userControllers");
const authenticator = require("../middleware/auth"); 
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", profile); // Protect profile route with authenticator

module.exports = router;
