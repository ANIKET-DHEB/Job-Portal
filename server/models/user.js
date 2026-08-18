const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ==========================
    // Name
    // ==========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // Email
    // ==========================
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // ==========================
    // Password
    // ==========================
    password: {
      type: String,
      required: true,
    },

    // ==========================
    // User Role
    // ==========================
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;