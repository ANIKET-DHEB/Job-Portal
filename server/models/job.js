const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    responsibilities: [
      {
        type: String,
      },
    ],
    benefits: [
      {
        type: String,
      },
    ],
    jobType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);