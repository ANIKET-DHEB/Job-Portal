const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const profileRoutes = require("./routes/profileRoutes");

// ==============================
// Load Environment Variables
// ==============================

dotenv.config();

// ==============================
// Create Express App
// ==============================

const app = express();

// ==============================
// Middleware
// ==============================

app.use(cors());

app.use(express.json());

// ==============================
// Serve Uploaded Files
// ==============================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(
  "/uploads/resumes",
  express.static(
    path.join(__dirname, "uploads", "resumes")
  )
);

// ==============================
// Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/profile", profileRoutes);

// ==============================
// MongoDB Connection
// ==============================

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("❌ MongoDB Connection Failed");
    console.log(error);
  });

// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {
  res.send("Backend Server Running 🚀");
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});