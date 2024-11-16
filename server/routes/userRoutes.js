const express = require("express");
const { registerUser, loginUser, profile } = require("../controllers/userControllers");
const authenticator = require("../middleware/auth");
const router = express.Router();
router.post("/google-signin", googleSignIn);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticator, profile); // Protect the profile route with authenticator middleware

module.exports = router;
