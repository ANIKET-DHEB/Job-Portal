const Profile = require("../models/Profile");

// ===============================
// Create Profile
// ===============================
const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);

    res.status(201).json({
      success: true,
      message: "Profile Created Successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Profile
// ===============================
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId,
    });

    // If profile doesn't exist yet
    if (!profile) {
      return res.status(200).json({
        success: true,
        profile: {
          userId: req.params.userId,
          fullName: "",
          phone: "",
          location: "",
          qualification: "",
          experience: "",
          skills: "",
          about: "",
          github: "",
          linkedin: "",
          portfolio: "",
          resume: "",
          profileImage: "",
        },
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.log("GET PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Profile
// ===============================
const updateProfile = async (req, res) => {
  try {
    const updateData = {
      userId: req.params.userId,
      fullName: req.body.fullName || "",
      phone: req.body.phone || "",
      location: req.body.location || "",
      qualification: req.body.qualification || "",
      experience: req.body.experience || "",
      skills: req.body.skills || "",
      about: req.body.about || "",
      linkedin: req.body.linkedin || "",
      github: req.body.github || "",
      portfolio: req.body.portfolio || "",
    };

    // ===============================
    // Profile Image
    // ===============================
    if (
      req.files &&
      req.files.profileImage &&
      req.files.profileImage.length > 0
    ) {
      updateData.profileImage =
        "/uploads/resumes/" +
        req.files.profileImage[0].filename;
    }

    // ===============================
    // Resume
    // ===============================
    if (
      req.files &&
      req.files.resume &&
      req.files.resume.length > 0
    ) {
      updateData.resume =
        "/uploads/resumes/" +
        req.files.resume[0].filename;
    }

    // ===============================
    // Create OR Update Profile
    // ===============================
    const profile = await Profile.findOneAndUpdate(
      { userId: req.params.userId },
      updateData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profile,
    });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Export
// ===============================
module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};