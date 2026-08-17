import "../styles/JobCard.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SavedJobsContext } from "../context/SavedJobsContext";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaHeart,
} from "react-icons/fa";

function JobCard({
  id,
  title,
  company,
  location,
  salary,
  type,
}) {
  const navigate = useNavigate();

  const { savedJobs, saveJob } = useContext(SavedJobsContext);

  const isSaved = savedJobs.some((item) => item.id === id);

  // View Details
  function handleViewDetails() {
    navigate(`/jobs/${id}`);
  }

  return (
    <div className="job-card">

      <div className="card-top">
        <span className="badge">🔥 Featured</span>

        <div
          className="heart-icon"
          onClick={() =>
            saveJob({
              id,
              title,
              company,
              location,
              salary,
              type,
            })
          }
        >
          <FaHeart color={isSaved ? "red" : "#94a3b8"} size={20} />
        </div>
      </div>

      <h3>{title}</h3>

      <p
        className="job-info company-link"
        onClick={() => navigate(`/company/${company}`)}
      >
        <FaBuilding className="icon" />
        {company}
      </p>

      <p className="job-info">
        <FaMapMarkerAlt className="icon" />
        {location}
      </p>

      <p className="job-info">
        <FaMoneyBillWave className="icon" />
        {salary}
      </p>

      <p className="job-info">
        <FaBriefcase className="icon" />
        {type}
      </p>

      <div className="btn-group">
        <button
          className="details-btn"
          onClick={handleViewDetails}
        >
          View Details
        </button>

        <button
        
          className="apply-btn"
          onClick={() => navigate(`/apply/${id}`)}
        >
          Apply Now
        </button>
      </div>

    </div>
  );
}

export default JobCard;