const jwt = require("jsonwebtoken");

function authenticator(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded.userId; // Attach user ID to the request
    next();
  });
}

module.exports = authenticator;
