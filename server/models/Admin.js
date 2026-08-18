const mongoose = require("mongoose");
const adminConnection = require("../config/adminDatabase");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      default: "Administrator",
    },

    email: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = adminConnection.model(
  "Admin",
  adminSchema
);