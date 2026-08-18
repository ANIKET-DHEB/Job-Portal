const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // ==========================
    // Get Authorization Header
    // ==========================
    const authHeader = req.header("Authorization");

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }

    // ==========================
    // Check Bearer Token
    // ==========================
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization Format.",
      });
    }

    // Remove "Bearer " from token
    const token = authHeader.split(" ")[1];

    // ==========================
    // Verify JWT Token
    // ==========================
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ==========================
    // Save User Information
    // ==========================
    req.user = decoded;

    // Continue
    next();

  } catch (error) {
    console.log("Auth Middleware Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = protect;