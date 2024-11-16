// const express = require("express");
// const { registerUser, loginUser, profile } = require("../controllers/userControllers");
// const authenticator = require("../middleware/auth");
// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", authenticator, profile); // Protect the profile route with authenticator middleware

// module.exports = router;

const express = require("express");
const passport = require("passport");
const router = express.Router();

// Route to start Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route after successful Google OAuth
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    // Successful login
    res.redirect("/profile"); // Redirect user to their profile
});

// Route to log out the user
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/login"); // Redirect to login page
    });
});

module.exports = router;
