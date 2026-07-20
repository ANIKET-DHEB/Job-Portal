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

function FrontendDetails() {
  return (
    <div className="details-container">

      {/* Header */}
      <div className="details-header">
        <h1>Frontend Developer</h1>
        <p className="company">
          <FaBuilding className="info-icon" /> Google
        </p>
      </div>

      {/* Job Information */}
      <div className="info">
        <p>
          <FaMapMarkerAlt className="info-icon" />
          Mumbai
        </p>

        <p>
          <FaMoneyBillWave className="info-icon" />
          ₹8 LPA
        </p>

        <p>
          <FaBriefcase className="info-icon" />
          Full Time
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
          We are looking for a Frontend Developer with knowledge of
          Node.js, Express.js, and MongoDB. You will assist in building REST
          APIs, integrating databases, fixing backend bugs, and collaborating
          with frontend developers to build scalable web applications.
        </p>
      </div>

      {/* Skills */}
      <div className="details-section">
        <h2>🛠 Skills Required</h2>

        <div className="skills">
          <span className="skill">Html5</span>
          <span className="skill">Css3</span>
          <span className="skill">React.js</span> 
          <span className="skill">Bootstarp</span>
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
      Develop responsive user interfaces using React.js.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Build reusable and maintainable React components.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Integrate frontend applications with REST APIs.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Work closely with UI/UX designers to create modern designs.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Optimize website performance and ensure cross-browser compatibility.
    </li>
  </ul>
</div>

{/* Benefits */}
<div className="details-section">
  <h2>🎁 Benefits</h2>

  <ul className="list">
    <li>
      <FaCheckCircle className="check-icon" />
      Competitive Salary Package
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Health Insurance
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
      Learning & Career Growth Programs
    </li>
  </ul>
</div>

      <button className="details-apply-btn">
        Apply Now
      </button>

    </div>
  );
}

export default FrontendDetails;