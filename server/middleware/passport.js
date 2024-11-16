const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const User = require("./models/usermodel"); // Import the User model
const jwt = require("jsonwebtoken");

const GOOGLE_CLIENT_ID = "your-client-id";
const GOOGLE_CLIENT_SECRET = "your-client-secret";

passport.use(
    new OAuth2Strategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback", // Adjust this URL as per your environment
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    // Create a new user if the user doesn't exist
                    user = new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        picture: profile.photos[0].value, // You can store the profile picture
                    });
                    await user.save();
                }

                // Create JWT token after successful authentication
                const token = jwt.sign({ userId: user._id }, "your-jwt-secret", { expiresIn: "1d" });

                return done(null, { user, token });
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Serialize and deserialize user for maintaining the session
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
