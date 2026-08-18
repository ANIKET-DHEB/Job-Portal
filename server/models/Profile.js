const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: String,
    phone: String,
    location: String,
    qualification: String,
    experience: String,
    skills: String,
    about: String,
    resume: String,
    profileImage: String,
    linkedin: String,
    github: String,
    portfolio: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);