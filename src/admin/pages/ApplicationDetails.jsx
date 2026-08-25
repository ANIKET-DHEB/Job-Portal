import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/ApplicationDetails.css";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Pending");
  const [updating, setUpdating] = useState(false);

  // ==========================
  // Get ADMIN JWT Token
  // ==========================

  const getAdminToken = () => {
    return localStorage.getItem("adminToken");
  };

  // ==========================
  // Fetch Application
  // ==========================

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);

      // ==========================
      // Get Admin Token
      // ==========================

      const token = getAdminToken();

      // ==========================
      // Check Admin Token
      // ==========================

      if (!token) {
        alert("Admin session not found. Please login again.");
        navigate("/admin");
        return;
      }

      // ==========================
      // Authorization Config
      // ==========================

      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // ==========================
      // Get Application
      // ==========================

      const res = await axios.get(
        `https://job-portal-backend-qlnk.onrender.com/api/applications/${id}`,
        authConfig
      );

      console.log(
        "APPLICATION DETAILS:",
        res.data.application
      );

      setApplication(res.data.application);

      setStatus(
        res.data.application.status || "Pending"
      );

    } catch (error) {
      console.log(
        "APPLICATION DETAILS ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      // ==========================
      // Unauthorized
      // ==========================

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        localStorage.removeItem("adminUser");

        alert(
          "Your admin login session has expired. Please login again."
        );

        navigate("/admin");

        return;
      }

      // ==========================
      // Forbidden
      // ==========================

      if (error.response?.status === 403) {
        alert(
          "You are not authorized to view this application."
        );

        navigate("/admin/applications");

        return;
      }

      alert(
        error.response?.data?.message ||
        "Failed to load application."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Update Status
  // ==========================

  const updateStatus = async () => {
    try {
      setUpdating(true);

      // ==========================
      // Get Admin Token
      // ==========================

      const token = getAdminToken();

      if (!token) {
        alert(
          "Admin session not found. Please login again."
        );

        navigate("/admin");

        return;
      }

      // ==========================
      // Authorization Config
      // ==========================

      const authConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // ==========================
      // Update Application Status
      // ==========================

      const res = await axios.put(
        `https://job-portal-backend-qlnk.onrender.com/api/applications/${id}/status`,
        {
          status: status,
        },
        authConfig
      );

      console.log(
        "UPDATED APPLICATION:",
        res.data.application
      );

      // ==========================
      // Update Screen
      // ==========================

      setApplication(
        res.data.application
      );

      setStatus(
        res.data.application.status || status
      );

      alert(
        res.data.message ||
        "Application status updated successfully!"
      );

    } catch (error) {
      console.log(
        "UPDATE STATUS ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        localStorage.removeItem("adminUser");

        alert(
          "Your admin login session has expired. Please login again."
        );

        navigate("/admin");

        return;
      }

      alert(
        error.response?.data?.message ||
        "Failed to update status."
      );

    } finally {
      setUpdating(false);
    }
  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="admin-layout">

        <AdminSidebar />

        <div className="admin-content">

          <AdminNavbar />

          <div className="application-loading">

            <h2>
              Loading Application...
            </h2>

            <p>
              Please wait while we load
              the application.
            </p>

          </div>

        </div>

      </div>
    );
  }

  // ==========================
  // Application Not Found
  // ==========================

  if (!application) {
    return (
      <div className="admin-layout">

        <AdminSidebar />

        <div className="admin-content">

          <AdminNavbar />

          <div className="application-not-found">

            <h2>
              Application Not Found
            </h2>

            <p>
              The application you are
              looking for does not exist.
            </p>

            <button
              className="back-btn"
              onClick={() =>
                navigate(
                  "/admin/applications"
                )
              }
            >
              ← Back to Applications
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="admin-layout">

      {/* ==========================
          SIDEBAR
      ========================== */}

      <AdminSidebar />

      {/* ==========================
          CONTENT
      ========================== */}

      <div className="admin-content">

        <AdminNavbar />

        <div className="application-details-container">

          {/* ==========================
              HEADER
          ========================== */}

          <div className="application-details-header">

            <div>

              <button
                className="back-btn"
                onClick={() =>
                  navigate(
                    "/admin/applications"
                  )
                }
              >
                ← Back to Applications
              </button>

              <h1>
                Application Details
              </h1>

              <p>
                Review applicant information
                and application status.
              </p>

            </div>

            {/* Current Status */}

            <span
              className={`application-status ${status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {status}
            </span>

          </div>

          {/* ==========================
              APPLICANT INFORMATION
          ========================== */}

          <div className="details-card">

            <h2>
              Applicant Information
            </h2>

            <div className="details-grid">

              <div className="detail-item">

                <span>
                  Name
                </span>

                <strong>
                  {application.fullName ||
                    "N/A"}
                </strong>

              </div>

              <div className="detail-item">

                <span>
                  Email
                </span>

                <strong>
                  {application.email ||
                    "N/A"}
                </strong>

              </div>

              <div className="detail-item">

                <span>
                  Phone
                </span>

                <strong>
                  {application.phone ||
                    "N/A"}
                </strong>

              </div>

              <div className="detail-item">

                <span>
                  Applied On
                </span>

                <strong>
                  {application.createdAt
                    ? new Date(
                        application.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </strong>

              </div>

            </div>

          </div>

          {/* ==========================
              JOB INFORMATION
          ========================== */}

          <div className="details-card">

            <h2>
              Job Information
            </h2>

            <div className="details-grid">

              <div className="detail-item">

                <span>
                  Job Title
                </span>

                <strong>
                  {application.jobId?.title ||
                    "N/A"}
                </strong>

              </div>

              <div className="detail-item">

                <span>
                  Company
                </span>

                <strong>
                  {application.jobId?.company ||
                    "N/A"}
                </strong>

              </div>

              <div className="detail-item">

                <span>
                  Location
                </span>

                <strong>
                  {application.jobId?.location ||
                    "N/A"}
                </strong>

              </div>

              <div className="detail-item">

                <span>
                  Salary
                </span>

                <strong>
                  {application.jobId?.salary ||
                    "N/A"}
                </strong>

              </div>

              <div className="detail-item">

                <span>
                  Job Type
                </span>

                <strong>
                  {application.jobId?.jobType ||
                    "N/A"}
                </strong>

              </div>

            </div>

          </div>

          {/* ==========================
              RESUME
          ========================== */}

          <div className="details-card">

            <h2>
              Resume
            </h2>

            {application.resume &&
            application.resume !== "Resume Upload Coming Soon" ? (

              <a
                href={
                  application.resume.startsWith("http")
                    ? application.resume
                    : `https://job-portal-backend-qlnk.onrender.com${
                        application.resume.startsWith("/uploads/")
                          ? application.resume
                          : `/uploads/resumes/${application.resume}`
                      }`
                }
                className="resume-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 View Resume
              </a>

            ) : (

              <p className="empty-text">
                No resume available.
              </p>

            )}

          </div>

          {/* ==========================
              COVER LETTER
          ========================== */}

          <div className="details-card">

            <h2>
              Cover Letter
            </h2>

            <div className="cover-letter">

              {application.coverLetter ||
                "No cover letter provided."}

            </div>

          </div>

          {/* ==========================
              STATUS MANAGEMENT
          ========================== */}

          <div className="details-card">

            <h2>
              Application Status
            </h2>

            <div className="status-controls">

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Reviewed">
                  Reviewed
                </option>

                <option value="Shortlisted">
                  Shortlisted
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

              <button
                className="update-status-btn"
                onClick={updateStatus}
                disabled={updating}
              >
                {updating
                  ? "Updating..."
                  : "Update Status"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ApplicationDetails;