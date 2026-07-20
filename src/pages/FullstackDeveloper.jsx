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

function FullstackDetails() {
  return (
    <div className="details-container">

      {/* Header */}
      <div className="details-header">
        <h1>Full Stack Developer</h1>
        <p className="company">
          <FaBuilding className="info-icon" /> Amazon
        </p>
      </div>

      {/* Job Information */}
      <div className="info">
        <p>
          <FaMapMarkerAlt className="info-icon" />
          Hyderabad
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
          Last Date: 15 September 2026
        </p>
      </div>

      {/* Job Description */}
      <div className="details-section">
        <h2>📄 Job Description</h2>

        <p>
         We are looking for a passionate Full Stack Developer with experience in both frontend and backend development. You will be responsible for designing, developing, testing, and maintaining scalable web applications using the MERN Stack. You will collaborate with designers, backend engineers, and product managers to build secure, high-performance, and user-friendly applications.
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
      Develop responsive frontend applications using React.js.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Build secure REST APIs using Node.js and Express.js.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Design and manage MongoDB databases efficiently.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Integrate frontend with backend services and APIs.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Debug, test, and optimize application performance.
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Collaborate with cross-functional teams using Git and Agile practices.
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
      Health & Medical Insurance
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
      Learning & Certification Support
    </li>

    <li>
      <FaCheckCircle className="check-icon" />
      Annual Performance Bonus
    </li>
  </ul>
</div>

      <button className="details-apply-btn">
        Apply Now
      </button>

    </div>
  );
}

export default FullstackDetails;