
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/EditJob.css";

function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`
      );

      const jobData = res.data.job;

      setJob({
        title: jobData.title || "",
        company: jobData.company || "",
        location: jobData.location || "",
        salary: jobData.salary || "",
        experience: jobData.experience || "",
        qualification: jobData.qualification || "",
        jobType: jobData.jobType || "",
        skills: Array.isArray(jobData.skills)
          ? jobData.skills.join(", ")
          : jobData.skills || "",
        description: jobData.description || "",
        responsibilities: Array.isArray(jobData.responsibilities)
          ? jobData.responsibilities.join(", ")
          : jobData.responsibilities || "",
        benefits: Array.isArray(jobData.benefits)
          ? jobData.benefits.join(", ")
          : jobData.benefits || "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load job.");
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const convertToArray = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedJob = {
        ...job,
        skills: convertToArray(job.skills),
        responsibilities: convertToArray(
          job.responsibilities
        ),
        benefits: convertToArray(job.benefits),
      };

      await axios.put(
        `http://localhost:5000/api/jobs/${id}`,
        updatedJob
      );

      alert("Job Updated Successfully!");

      navigate("/admin/jobs");
    } catch (err) {
      console.log(err);
      alert("Failed to update job.");
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminNavbar />

        <div className="edit-job-container">
          <h2>Edit Job</h2>

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
              <option value="">
                Select Job Type
              </option>

              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Remote">
                Remote
              </option>

              <option value="Hybrid">
                Hybrid
              </option>
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
              rows="6"
              placeholder="Responsibilities (Comma Separated)"
              value={job.responsibilities}
              onChange={handleChange}
            />

            <textarea
              name="benefits"
              rows="6"
              placeholder="Benefits (Comma Separated)"
              value={job.benefits}
              onChange={handleChange}
            />

            <button type="submit">
              Update Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditJob;

