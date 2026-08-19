
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../../styles/EditJob.css";

function AddJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    qualification: "",
    jobType: "",
    skills: "",
    description: "",
    responsibilities: "",
    benefits: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newJob = {
        ...job,

        skills: job.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),

        responsibilities: job.responsibilities
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),

        benefits: job.benefits
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };

      await axios.post(
        "https://job-portal-backend-qlnk.onrender.com/api/jobs",
        newJob
      );

      alert("Job Added Successfully!");

      navigate("/admin/jobs");
    } catch (err) {
      console.log(err);
      alert("Failed to add job.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminNavbar />

        <div className="edit-job-container">
          <h2>Add New Job</h2>

          <form
            onSubmit={handleSubmit}
            className="edit-job-form"
          >
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={job.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="company"
              placeholder="Company"
              value={job.company}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={job.location}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="salary"
              placeholder="Salary"
              value={job.salary}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={job.experience}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              value={job.qualification}
              onChange={handleChange}
              required
            />

            <select
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <input
              type="text"
              name="skills"
              placeholder="Skills (Comma Separated)"
              value={job.skills}
              onChange={handleChange}
            />

            <textarea
              name="description"
              rows="6"
              placeholder="Job Description"
              value={job.description}
              onChange={handleChange}
            />

            <textarea
              name="responsibilities"
              rows="5"
              placeholder="Responsibilities (Comma Separated)"
              value={job.responsibilities}
              onChange={handleChange}
            />

            <textarea
              name="benefits"
              rows="5"
              placeholder="Benefits (Comma Separated)"
              value={job.benefits}
              onChange={handleChange}
            />

            <button type="submit">
              Add Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddJob;


