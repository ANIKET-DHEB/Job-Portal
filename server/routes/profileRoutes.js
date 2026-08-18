const express = require("express");

const {
  createProfile,
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const upload = require("../middleware/upload");

const router = express.Router();

// Create Profile
router.post("/", createProfile);

// Get Profile by User ID
router.get("/:userId", getProfile);

// Update Profile + Upload Image + Resume
router.put(
  "/:userId",
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  updateProfile
);

module.exports = router;