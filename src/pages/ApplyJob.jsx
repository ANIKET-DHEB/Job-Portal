import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/ApplyJob.css";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    qualification: "",
    experience: "",
    skills: "",
    coverLetter: "",
  });

  // ==========================
  // Resume State
  // ==========================

  const [resume, setResume] = useState(null);

  // ==========================
  // Handle Input
  // ==========================

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // ==========================
  // Handle Resume
  // ==========================

  function handleResumeChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setResume(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only PDF, DOC or DOCX files.");
      e.target.value = "";
      setResume(null);
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Resume size must be less than 5 MB.");
      e.target.value = "";
      setResume(null);
      return;
    }

    setResume(file);
  }

  // ==========================
  // Submit Application
  // ==========================

  async function handleSubmit(e) {
    e.preventDefault();

    // ==========================
    // Check Login
    // ==========================

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before applying for a job.");
      navigate("/login");
      return;
    }

    // ==========================
    // Resume Required
    // ==========================

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    try {
      // ==========================
      // Create FormData
      // ==========================

      const data = new FormData();

      data.append("fullName", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("location", formData.location);
      data.append("qualification", formData.qualification);
      data.append("experience", formData.experience);
      data.append("skills", formData.skills);
      data.append("coverLetter", formData.coverLetter);
      data.append("jobId", id);

      // Actual resume
      data.append("resume", resume);

      // ==========================
      // Submit Application
      // ==========================

      await axios.post(
        "https://job-portal-backend-qlnk.onrender.com /api/applications",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Application Submitted Successfully!");

      // ==========================
      // Reset Form
      // ==========================

      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        qualification: "",
        experience: "",
        skills: "",
        coverLetter: "",
      });

      setResume(null);

      // ==========================
      // Go To Jobs
      // ==========================

      navigate("/jobs");
    } catch (error) {
      console.log("APPLICATION ERROR:", error);

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "❌ Failed to submit application"
      );
    }
  }

  return (
    <div className="apply-page">

      <div className="apply-container">

        <h1>Apply for Job</h1>

        <form
          className="apply-form"
          onSubmit={handleSubmit}
        >

          {/* ==========================
              FULL NAME
          ========================== */}

          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* ==========================
              EMAIL
          ========================== */}

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* ==========================
              PHONE
          ========================== */}

          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* ==========================
              LOCATION
          ========================== */}

          <label>Current Location</label>

          <input
            type="text"
            name="location"
            placeholder="Current City"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* ==========================
              QUALIFICATION
          ========================== */}

          <label>Highest Qualification</label>

          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Qualification
            </option>

            <option>BCA</option>
            <option>B.Sc</option>
            <option>B.Tech</option>
            <option>MCA</option>
            <option>M.Tech</option>
          </select>

          {/* ==========================
              EXPERIENCE
          ========================== */}

          <label>Experience</label>

          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Experience
            </option>

            <option>Fresher</option>
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3+ Years</option>
          </select>

          {/* ==========================
              SKILLS
          ========================== */}

          <label>Skills</label>

          <input
            type="text"
            name="skills"
            placeholder="React, JavaScript, HTML..."
            value={formData.skills}
            onChange={handleChange}
          />

          {/* ==========================
              RESUME
          ========================== */}

          <label>Resume</label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            required
          />

          {resume && (
            <p
              style={{
                marginTop: "8px",
                color: "#16a34a",
                fontSize: "14px",
              }}
            >
              ✓ {resume.name}
            </p>
          )}

          {/* ==========================
              COVER LETTER
          ========================== */}

          <label>Cover Letter</label>

          <textarea
            rows="5"
            name="coverLetter"
            placeholder="Tell us why you're a good fit..."
            value={formData.coverLetter}
            onChange={handleChange}
          />

          {/* ==========================
              SUBMIT
          ========================== */}

          <button type="submit">
            Submit Application
          </button>

        </form>

      </div>

    </div>
  );
}

export default ApplyJob;

