const express = require("express");

const {
  applyJob,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// ===============================
// Apply for a Job
// ===============================
// Login required
// Resume upload handled by Multer
router.post(
  "/",
  protect,
  upload.single("resume"),
  applyJob
);

// ===============================
// Get All Applications
// ===============================
router.get(
  "/",
  protect,
  getApplications
);

// ===============================
// Get Single Application
// ===============================
router.get(
  "/:id",
  protect,
  getApplicationById
);

// ===============================
// Update Application Status
// ===============================
router.put(
  "/:id/status",
  protect,
  updateApplicationStatus
);

// ===============================
// Delete Application
// ===============================
router.delete(
  "/:id",
  protect,
  deleteApplication
);

module.exports = router;