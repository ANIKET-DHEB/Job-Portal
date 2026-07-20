import "../styles/JobDetails.css";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

import { MdWorkHistory } from "react-icons/md";

function BackendDetails() {
  return (
    <div className="details-container">

      {/* Header */}
      <div className="details-header">
        <h1>Backend Developer Intern</h1>
        <p className="company">
          <FaBuilding className="info-icon" /> Microsoft
        </p>
      </div>

      {/* Job Information */}
      <div className="info">
        <p>
          <FaMapMarkerAlt className="info-icon" />
          Bangalore
        </p>

        <p>
          <FaMoneyBillWave className="info-icon" />
          ₹25,000/month
        </p>

        <p>
          <FaBriefcase className="info-icon" />
          Internship
        </p>

        <p>
          <MdWorkHistory className="info-icon" />
          Fresher
        </p>
      </div>

      {/* Qualification & Last Date */}
      <div className="info">
        <p>
          <FaGraduationCap className="info-icon" />
          B.E / B.Tech / BCA / MCA
        </p>

        <p>
          <FaCalendarAlt className="info-icon" />
          Last Date: 30 August 2026
        </p>
      </div>

      {/* Job Description */}
      <div className="details-section">
        <h2>📄 Job Description</h2>

        <p>
          We are looking for a Backend Developer Intern with knowledge of
          Node.js, Express.js, and MongoDB. You will assist in building REST
          APIs, integrating databases, fixing backend bugs, and collaborating
          with frontend developers to build scalable web applications.
        </p>
      </div>

      {/* Skills */}
      <div className="details-section">
        <h2>🛠 Skills Required</h2>

        <div className="skills">
          <span className="skill">Node.js</span>
          <span className="skill">Express.js</span>
          <span className="skill">MongoDB</span>
          <span className="skill">REST API</span>
          <span className="skill">Git</span>
          <span className="skill">JavaScript</span>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="details-section">
        <h2>⭐ Responsibilities</h2>

        <ul className="list">
          <li>
            <FaCheckCircle className="check-icon" />
            Develop REST APIs using Node.js and Express.js.
          </li>

          <li>
            <FaCheckCircle className="check-icon" />
            Fix backend bugs and improve performance.
          </li>

          <li>
            <FaCheckCircle className="check-icon" />
            Work with MongoDB databases.
          </li>

          <li>
            <FaCheckCircle className="check-icon" />
            Collaborate with frontend developers.
          </li>

          <li>
            <FaCheckCircle className="check-icon" />
            Write clean and maintainable code.
          </li>
        </ul>
      </div>

      {/* Benefits */}
      <div className="details-section">
        <h2>🎁 Benefits</h2>

        <ul className="list">
          <li>
            <FaCheckCircle className="check-icon" />
            Internship Certificate
          </li>

          <li>
            <FaCheckCircle className="check-icon" />
            Letter of Recommendation
          </li>

          <li>
            <FaCheckCircle className="check-icon" />
            Flexible Working Hours
          </li>

          <li>
            <FaCheckCircle className="check-icon" />
            Hybrid Work Opportunity
          </li>

          <li>
            <FaCheckCircle className="check-icon" />
            PPO Opportunity for Top Performers
          </li>
        </ul>
      </div>

      <button className="details-apply-btn">
        Apply Now
      </button>

    </div>
  );
}

export default BackendDetails;