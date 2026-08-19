
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../styles/JobDetails.css";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaGraduationCap,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

import { MdWorkHistory } from "react-icons/md";

function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`https://job-portal-backend-qlnk.onrender.com /api/jobs/${id}`)
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!job) {
    return (
      <div className="job-details-loading">
        <h2>Loading Job Details...</h2>
      </div>
    );
  }

  return (
    <div className="details-page">

      <div className="details-container">

        {/* =========================
            JOB HEADER
        ========================= */}

        <div className="details-header">

          <div className="details-header-content">

            <div className="job-icon-box">
              <FaBriefcase />
            </div>

            <div>
              <h1>{job.title}</h1>

              <p
                className="company clickable-company"
                onClick={() =>
                  navigate(`/company/${job.company}`)
                }
              >
                <FaBuilding className="info-icon" />
                {job.company}
              </p>
            </div>

          </div>

          <button
            className="details-apply-btn header-apply-btn"
            onClick={() =>
              navigate(`/apply/${job._id}`)
            }
          >
            Apply Now
          </button>

        </div>

        {/* =========================
            JOB INFORMATION
        ========================= */}

        <div className="job-info-grid">

          <div className="job-info-card">

            <FaMapMarkerAlt className="job-info-icon" />

            <div>
              <span>Location</span>
              <strong>{job.location}</strong>
            </div>

          </div>

          <div className="job-info-card">

            <FaMoneyBillWave className="job-info-icon" />

            <div>
              <span>Salary</span>
              <strong>{job.salary}</strong>
            </div>

          </div>

          <div className="job-info-card">

            <FaBriefcase className="job-info-icon" />

            <div>
              <span>Job Type</span>
              <strong>{job.jobType}</strong>
            </div>

          </div>

          <div className="job-info-card">

            <MdWorkHistory className="job-info-icon" />

            <div>
              <span>Experience</span>
              <strong>{job.experience}</strong>
            </div>

          </div>

          <div className="job-info-card">

            <FaGraduationCap className="job-info-icon" />

            <div>
              <span>Qualification</span>
              <strong>{job.qualification}</strong>
            </div>

          </div>

        </div>

        {/* =========================
            JOB DESCRIPTION
        ========================= */}

        <div className="details-section">

          <h2>
            <span>📄</span>
            Job Description
          </h2>

          <p className="description-text">
            {job.description}
          </p>

        </div>

        {/* =========================
            SKILLS
        ========================= */}

        {job.skills && job.skills.length > 0 && (

          <div className="details-section">

            <h2>
              <span>🛠️</span>
              Skills Required
            </h2>

            <div className="skills">

              {job.skills.map((skill, index) => (

                <span
                  className="skill"
                  key={index}
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

        )}

        {/* =========================
            RESPONSIBILITIES
        ========================= */}

        {job.responsibilities &&
          job.responsibilities.length > 0 && (

          <div className="details-section">

            <h2>
              <span>📋</span>
              Responsibilities
            </h2>

            <ul className="job-list">

              {job.responsibilities.map(
                (responsibility, index) => (

                  <li key={index}>

                    <FaCheckCircle className="list-icon" />

                    <span>
                      {responsibility}
                    </span>

                  </li>

                )
              )}

            </ul>

          </div>

        )}

        {/* =========================
            BENEFITS
        ========================= */}

        {job.benefits &&
          job.benefits.length > 0 && (

          <div className="details-section">

            <h2>
              <span>🎁</span>
              Benefits
            </h2>

            <ul className="job-list benefits-list">

              {job.benefits.map(
                (benefit, index) => (

                  <li key={index}>

                    <FaCheckCircle className="list-icon" />

                    <span>
                      {benefit}
                    </span>

                  </li>

                )
              )}

            </ul>

          </div>

        )}

        {/* =========================
            BOTTOM APPLY
        ========================= */}

        <div className="details-apply-container">

          <div>

            <h3>
              Interested in this opportunity?
            </h3>

            <p>
              Apply now and take the next step
              toward your career.
            </p>

          </div>

          <button
            className="details-apply-btn"
            onClick={() =>
              navigate(`/apply/${job._id}`)
            }
          >
            Apply Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default JobDetails;



