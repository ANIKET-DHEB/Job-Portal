import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/MyApplications.css";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaEye,
  FaTrash,
  FaBriefcase,
} from "react-icons/fa";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  // ==========================
  // LOADING STATE
  // ==========================

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ==========================
  // GET CURRENT NORMAL USER TOKEN
  // ==========================

  const getUserToken = () => {
    return localStorage.getItem("userToken");
  };

  // ==========================
  // FETCH APPLICATIONS
  // ==========================

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      // ==========================
      // GET CURRENT USER TOKEN
      // ==========================

      const token = getUserToken();

      console.log("My Applications Token:", token);

      // ==========================
      // CHECK LOGIN
      // ==========================

      if (!token) {
        console.log("No normal user token found.");

        alert("Please login first.");

        navigate("/login");

        return;
      }

      // ==========================
      // AUTHORIZATION HEADER
      // ==========================

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // ==========================
      // GET USER APPLICATIONS
      // ==========================

      const res = await axios.get(
        "https://job-portal-backend-qlnk.onrender.com/api/applications",
        config
      );

      console.log(
        "MY APPLICATIONS:",
        res.data.applications
      );

      setApplications(
        res.data.applications || []
      );

    } catch (error) {
      console.log(
        "MY APPLICATIONS ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      // ==========================
      // UNAUTHORIZED
      // ==========================

      if (error.response?.status === 401) {
        localStorage.removeItem("userToken");

        alert(
          "Your login session has expired. Please login again."
        );

        navigate("/login");

        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to load applications."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // DELETE APPLICATION
  // ==========================

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      // ==========================
      // GET CURRENT USER TOKEN
      // ==========================

      const token = getUserToken();

      console.log(
        "Delete Application Token:",
        token
      );

      // ==========================
      // CHECK LOGIN
      // ==========================

      if (!token) {
        alert("Please login first.");

        navigate("/login");

        return;
      }

      // ==========================
      // DELETE APPLICATION
      // ==========================

      await axios.delete(
        `https://job-portal-backend-qlnk.onrender.com/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ==========================
      // REMOVE FROM UI
      // ==========================

      setApplications((prev) =>
        prev.filter(
          (app) => app._id !== id
        )
      );

      alert(
        "Application deleted successfully."
      );

    } catch (error) {
      console.log(
        "DELETE APPLICATION ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      // ==========================
      // TOKEN EXPIRED
      // ==========================

      if (error.response?.status === 401) {
        localStorage.removeItem("userToken");

        alert(
          "Your login session has expired. Please login again."
        );

        navigate("/login");

        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to delete application."
      );
    }
  };

  // ==========================
  // STATUS CLASS
  // ==========================

  const getStatusClass = (status) => {
    switch (status) {
      case "Reviewed":
        return "reviewed";

      case "Shortlisted":
        return "shortlisted";

      case "Rejected":
        return "rejected";

      default:
        return "pending";
    }
  };

  // ==========================
  // STATUS TEXT
  // ==========================

  const getStatusText = (status) => {
    switch (status) {
      case "Reviewed":
        return "Reviewed";

      case "Shortlisted":
        return "Shortlisted";

      case "Rejected":
        return "Rejected";

      default:
        return "Pending";
    }
  };

  return (
    <div>

      {/* ==========================
          HEADER
      ========================== */}

      <div className="applications-header">

        <h1>
          My Applications
        </h1>

        <p>
          Track every job you've applied for
          in one place.
        </p>

      </div>

      {/* ==========================
          APPLICATION CARDS
      ========================== */}

      <div className="applications-container">

        {/* ==========================
            LOADING
        ========================== */}

        {loading ? (

          <div className="no-data">

            <h2>
              ⏳ Loading Applications...
            </h2>

            <p>
              Please wait while we fetch your applications.
            </p>

          </div>

        ) : applications.length > 0 ? (

          applications.map((application) => (

            <div
              className="my-application-card"
              key={application._id}
            >

              {/* ==========================
                  CARD HEADER
              ========================== */}

              <div className="card-header">

                <div className="job-title">

                  <h2>
                    {application.jobId?.title ||
                      "Job Title"}
                  </h2>

                  <div className="company-name">

                    <FaBuilding />

                    <span>
                      {application.jobId?.company ||
                        "Company"}
                    </span>

                  </div>

                </div>

                {/* ==========================
                    APPLICATION STATUS
                ========================== */}

                <span
                  className={`status ${getStatusClass(
                    application.status
                  )}`}
                >
                  {getStatusText(
                    application.status
                  )}
                </span>

              </div>

              {/* ==========================
                  JOB INFORMATION
              ========================== */}

              <div className="card-section">

                <p>
                  <FaMapMarkerAlt />

                  <span>
                    {application.jobId?.location ||
                      "N/A"}
                  </span>
                </p>

                <p>
                  <FaMoneyBillWave />

                  <span>
                    {application.jobId?.salary ||
                      "N/A"}
                  </span>
                </p>

                <p>
                  <FaBriefcase />

                  <span>
                    {application.jobId?.jobType ||
                      "Full Time"}
                  </span>
                </p>

                <p>
                  <FaCalendarAlt />

                  <span>
                    Applied on{" "}
                    {application.createdAt
                      ? new Date(
                          application.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>

              </div>

              <hr />

              {/* ==========================
                  APPLICANT DETAILS
              ========================== */}

              <div className="card-section">

                <h3>
                  Applicant Details
                </h3>

                <p>
                  <FaUser />

                  <span>
                    {application.fullName ||
                      "N/A"}
                  </span>
                </p>

                <p>
                  <FaEnvelope />

                  <span>
                    {application.email ||
                      "N/A"}
                  </span>
                </p>

                <p>
                  <FaPhoneAlt />

                  <span>
                    {application.phone ||
                      "N/A"}
                  </span>
                </p>

              </div>

              {/* ==========================
                  BUTTONS
              ========================== */}

              <div className="application-buttons">

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(
                      `/jobs/${application.jobId?._id}`
                    )
                  }
                >
                  <FaEye />
                  View Job
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteApplication(
                      application._id
                    )
                  }
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="no-data">

            <h2>
              No Applications Found
            </h2>

            <p>
              You haven't applied for any jobs yet.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default MyApplications;