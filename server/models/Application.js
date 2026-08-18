const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // ===============================
    // Logged-in User
    // ===============================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===============================
    // Applicant Information
    // ===============================
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // ===============================
    // Resume
    // ===============================
    resume: {
      type: String,
      required: true,
    },

    // ===============================
    // Cover Letter
    // ===============================
    coverLetter: {
      type: String,
      required: true,
    },

    // ===============================
    // Job
    // ===============================
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // ===============================
    // Application Status
    // ===============================
    status: {
      type: String,
      enum: [
        "Pending",
        "Reviewed",
        "Shortlisted",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);