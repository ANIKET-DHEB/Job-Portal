import "../styles/JobDetails.css";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
} from "react-icons/fa";

import { MdWorkHistory } from "react-icons/md"; 

function JobDetails() {
  return (
    <div className="details-container">
      <div className="details-header">
        <h1>Frontend Developer</h1>
        <p className="company">Google</p>
      </div>

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
    1-3 Years
  </p>
</div>

      <div className="details-section">
        <h2>Job Description</h2>
        <p>
          We are looking for a passionate Frontend Developer with experience in
          React.js, JavaScript, HTML, CSS, and responsive web design. You will
          work with a talented team to build modern web applications.
        </p>
      </div>

      <div className="details-section">
        <h2>Skills Required</h2>

        <div className="skills">
          <span className="skill">React</span>
          <span className="skill">JavaScript</span>
          <span className="skill">HTML5</span>
          <span className="skill">CSS3</span>
          <span className="skill">Git</span>
        </div>
      </div>

      <button className="details-apply-btn">Apply Now</button>
    </div>
  );
}

export default JobDetails;