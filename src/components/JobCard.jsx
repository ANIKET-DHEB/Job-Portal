import "../styles/JobCard.css";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase } from "react-icons/fa";
function JobCard({ title, company, location, salary, type }) {

  const navigate = useNavigate();

  function handleViewDetails() {
    navigate("/jobs/1");
  }
  return (
    <div className="job-card">

      <span className="badge">🔥 Featured</span>

      <h3>{title}</h3>
<p className="job-info">
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

        <button className="apply-btn">
          Apply
        </button>
      </div>

    </div>
  );
}

export default JobCard;