const express = require("express");

const {
  registerUser,
  loginUser,
  adminLogin,
  changeAdminPassword,
  getAllUsers,
  deleteUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// Test Route
// ==========================
router.get("/test", (req, res) => {
  res.json({
    message: "Auth Route Working ✅",
  });
});

// ==========================
// Register Route
// ==========================
router.post(
  "/register",
  registerUser
);

// ==========================
// Normal User Login Route
// ==========================
router.post(
  "/login",
  loginUser
);

// ==========================
// Admin Login Route
// ==========================
// Creates JWT containing:
// id + role: "admin"
router.post(
  "/admin-login",
  adminLogin
);

// ==========================
// Change Admin Password
// ==========================
// Requires valid JWT
router.put(
  "/admin/change-password",
  protect,
  changeAdminPassword
);

// ==========================
// Get All Users
// ==========================
// Admin dashboard currently uses this
// No JWT required for now
router.get(
  "/users",
  getAllUsers
);

// ==========================
// Delete User
// ==========================
// Admin dashboard currently uses this
// No JWT required for now
router.delete(
  "/users/:id",
  deleteUser
);

// ==========================
// Protected Profile Route
// ==========================
router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      success: true,
      message:
        "Welcome to your profile 🎉",
      user: req.user,
    });
  }
);

module.exports = router;