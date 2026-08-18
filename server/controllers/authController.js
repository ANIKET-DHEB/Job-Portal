const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ==========================
// Register User
// ==========================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ==========================
    // Check if email already exists
    // ==========================
    const existingUser = await User.findOne({ email });

    if (existingUser) { 
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ==========================
    // Encrypt password
    // ==========================
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // ==========================
    // Create new user
    // ==========================
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // ==========================
    // Save user
    // ==========================
    await newUser.save();

    // ==========================
    // Register success
    // ==========================
    res.status(201).json({
      success: true,
      message: "User Registered Successfully 🎉",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Login User
// ==========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ==========================
    // Find user by email
    // ==========================
    const user = await User.findOne({ email });

    // ==========================
    // User not found
    // ==========================
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================
    // Compare password
    // ==========================
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    // ==========================
    // Wrong password
    // ==========================
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // ==========================
    // Generate JWT Token
    // ==========================
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ==========================
    // Login success
    // ==========================
    res.status(200).json({
      success: true,
      message: "Login Successful 🎉",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Admin Login
// ==========================
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ==========================
    // Find Admin
    // ==========================
    const adminUser = await Admin.findOne({
      username: username,
    });

    // ==========================
    // Admin Not Found
    // ==========================
    if (!adminUser) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found.",
      });
    }

    // ==========================
    // Check Admin Password
    // ==========================
    if (password !== adminUser.password) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Admin Username or Password.",
      });
    }

    // ==========================
    // Generate Admin JWT
    // ==========================
    const token = jwt.sign(
      {
        id: adminUser._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ==========================
    // Admin Login Success
    // ==========================
    res.status(200).json({
      success: true,
      message: "Admin Login Successful 🎉",
      token,
      user: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        username: adminUser.username,
        role: "admin",
      },
    });
  } catch (error) {
    console.log(
      "ADMIN LOGIN ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Change Admin Password
// ==========================
const changeAdminPassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    // ==========================
    // Check Required Fields
    // ==========================
    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required.",
      });
    }

    // ==========================
    // Get Admin ID From JWT
    // ==========================
    const adminId = req.user.id;

    // ==========================
    // Find Admin
    // ==========================
    const adminUser =
      await Admin.findById(adminId);

    if (!adminUser) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found.",
      });
    }

    // ==========================
    // Check Current Password
    // ==========================
    if (
      currentPassword !==
      adminUser.password
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Current password is incorrect.",
      });
    }

    // ==========================
    // Save New Password
    // ==========================
    adminUser.password = newPassword;

    await adminUser.save();

    // ==========================
    // Success
    // ==========================
    return res.status(200).json({
      success: true,
      message:
        "Admin password changed successfully.",
    });
  } catch (error) {
    console.log(
      "CHANGE ADMIN PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Users
// ==========================
const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find().select(
      "-password"
    );

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete User
// ==========================
const deleteUser = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // ==========================
    // Find User
    // ==========================
    const user = await User.findById(id);

    // ==========================
    // User Not Found
    // ==========================
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================
    // Delete User
    // ==========================
    await User.findByIdAndDelete(id);

    // ==========================
    // Response
    // ==========================
    res.status(200).json({
      success: true,
      message:
        "User Deleted Successfully 🗑️",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Export
// ==========================
module.exports = {
  registerUser,
  loginUser,
  adminLogin,
  changeAdminPassword,
  getAllUsers,
  deleteUser,
};