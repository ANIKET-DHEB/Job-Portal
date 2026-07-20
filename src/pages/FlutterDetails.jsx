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

function FlutterDetails() {
  return (
    <div className="details-container">

      {/* Header */}
      <div className="details-header">
        <h1>Flutter Developer</h1>
        <p className="company">
          <FaBuilding className="info-icon" /> Godrej
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
          ₹12 LPA
        </p>

        <p>
          <FaBriefcase className="info-icon" />
          Full Time
        </p>

        <p>
          <MdWorkHistory className="info-icon" />
         1–3 Years
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
           We are looking for a talented Flutter Developer to build high-quality
    cross-platform mobile applications for Android and iOS. You will work
    closely with designers, backend developers, and product managers to
    develop scalable, user-friendly, and high-performance mobile applications.
        </p>
      </div>

      {/* Skills */}
      <div className="details-section">
        <h2>🛠 Skills Required</h2>

        <div className="skills">
            <span className="skill">Flutter</span>
    <span className="skill">Dart</span>
    <span className="skill">Firebase</span>
    <span className="skill">REST APIs</span>
    <span className="skill">Git & GitHub</span>
    <span className="skill">UI Design</span>
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

export default FlutterDetails;