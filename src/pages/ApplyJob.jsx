import { useState } from "react";
import "../styles/ApplyJob.css";

function ApplyJob() {
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

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Application Submitted Successfully 🎉");

    console.log(formData);

    // Clear all form fields
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

    // Clear the file input
    e.target.reset();
  }

  return (
    <div className="apply-container">
      <h1>Apply for Job</h1>

      <form className="apply-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Current Location</label>
        <input
          type="text"
          name="location"
          placeholder="Current City"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Highest Qualification</label>
        <select
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option>BCA</option>
          <option>B.Sc</option>
          <option>B.Tech</option>
          <option>MCA</option>
          <option>M.Tech</option>
        </select>

        <label>Experience</label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option>Fresher</option>
          <option>1 Year</option>
          <option>2 Years</option>
          <option>3+ Years</option>
        </select>

        <label>Skills</label>
        <input
          type="text"
          name="skills"
          placeholder="React, JavaScript, HTML..."
          value={formData.skills}
          onChange={handleChange}
        />

        <label>Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
        />

        <label>Cover Letter</label>
        <textarea
          rows="5"
          name="coverLetter"
          placeholder="Write something about yourself..."
          value={formData.coverLetter}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplyJob;