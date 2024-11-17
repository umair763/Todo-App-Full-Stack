const express = require("express");
const { createUser, registerUser, loginUser, profile } = require("../controllers/userControllers");
const authenticator = require("../middleware/auth");

const router = express.Router();

router.post("/registerG", createUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticator, profile);

module.exports = router;
