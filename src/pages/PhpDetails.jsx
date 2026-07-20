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

function PhpDetails() {
  return (
    <div className="details-container">

      {/* Header */}
      <div className="details-header">
        <h1>Flutter Developer</h1>
        <p className="company">
          <FaBuilding className="info-icon" />  Capgemini 
        </p>
      </div>

      {/* Job Information */}
      <div className="info">
        <p>
          <FaMapMarkerAlt className="info-icon" />
           Pune
        </p>

        <p>
          <FaMoneyBillWave className="info-icon" />
          ₹12 LPA
        </p>

        <p>
          <FaBriefcase className="info-icon" />
          Remote
        </p>

        <p>
          <MdWorkHistory className="info-icon" />
         1–2 Years
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
          Last Date: 05 September 2026
        </p>
      </div>

      {/* Job Description */}
      <div className="details-section">
        <h2>📄 Job Description</h2>

        <p>
         We are looking for a skilled PHP Developer to develop and maintain dynamic
    web applications using PHP and Laravel. You will work closely with frontend
    developers, database administrators, and QA engineers to build secure,
    scalable, and high-performance web solutions.
        </p>
      </div>

      {/* Skills */}
      <div className="details-section">
        <h2>🛠 Skills Required</h2>

        <div className="skills">
             <span className="skill">PHP</span>
    <span className="skill">Laravel</span>
    <span className="skill">MySQL</span>
    <span className="skill">HTML5</span>
    <span className="skill">CSS3</span>
    <span className="skill">JavaScript</span>
    <span className="skill">Git & GitHub</span>
    <span className="skill">REST APIs</span>
        </div>
      </div>

 {/* Responsibilities */}
<div className="details-section">
  <h2>⭐ Responsibilities</h2>

  <ul className="list">
    <li>
      <FaCheckCircle className="check-icon" />
      Develop and maintain web applications using PHP and Laravel.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Design and manage MySQL databases efficiently.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Build and integrate secure REST APIs.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Debug, test, and optimize application performance.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Collaborate with frontend developers and QA engineers.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Follow coding standards and maintain project documentation.
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

export default PhpDetails;