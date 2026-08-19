import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/Admin.css";

function ManageApplications() {
  const [applications, setApplications] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();

  // ==========================
  // Get ADMIN JWT Token
  // ==========================
  const getAdminToken = () => {
    return localStorage.getItem(
      "adminToken"
    );
  };

  // ==========================
  // Fetch Applications
  // ==========================
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {

      // ==========================
      // Get Admin Token
      // ==========================
      const token =
        getAdminToken();

      // ==========================
      // Check Admin Token
      // ==========================
      if (!token) {

        alert(
          "Admin session not found. Please login again."
        );

        navigate("/admin");

        return;
      }

      // ==========================
      // Get ALL Applications
      // ==========================
      const res =
        await axios.get(
          "https://job-portal-backend-qlnk.onrender.com/api/applications",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "ADMIN APPLICATIONS:",
        res.data.applications
      );

      // ==========================
      // Save Applications
      // ==========================
      setApplications(
        res.data.applications || []
      );

    } catch (error) {

      console.log(
        "FETCH APPLICATIONS ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      // ==========================
      // Unauthorized
      // ==========================
      if (
        error.response?.status === 401
      ) {

        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "admin"
        );

        alert(
          "Admin session expired. Please login again."
        );

        navigate("/admin");

        return;
      }

      // ==========================
      // Forbidden
      // ==========================
      if (
        error.response?.status === 403
      ) {

        alert(
          "You are not authorized to access applications."
        );

        return;
      }

      alert(
        "Failed to load applications."
      );
    }
  };

  // ==========================
  // Update Application Status
  // ==========================
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      // ==========================
      // Get Admin Token
      // ==========================
      const token =
        getAdminToken();

      if (!token) {

        alert(
          "Admin session not found. Please login again."
        );

        navigate("/admin");

        return;
      }

      // ==========================
      // Update Status
      // ==========================
      await axios.put(
        `https://job-portal-backend-qlnk.onrender.com/api/applications/${id}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // ==========================
      // Update UI Immediately
      // ==========================
      setApplications(
        (prevApplications) =>
          prevApplications.map(
            (application) =>
              application._id === id
                ? {
                    ...application,
                    status: status,
                  }
                : application
          )
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

      alert(
        error.response?.data?.message ||
          "Failed to update application status."
      );
    }
  };

  // ==========================
  // Delete Application
  // ==========================
  const deleteApplication = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this application?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      // ==========================
      // Get Admin Token
      // ==========================
      const token =
        getAdminToken();

      if (!token) {

        alert(
          "Admin session not found. Please login again."
        );

        navigate("/admin");

        return;
      }

      // ==========================
      // Delete Application
      // ==========================
      await axios.delete(
        `https://job-portal-backend-qlnk.onrender.com/api/applications/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // ==========================
      // Remove From UI
      // ==========================
      setApplications(
        (prevApplications) =>
          prevApplications.filter(
            (application) =>
              application._id !== id
          )
      );

      alert(
        "Application Deleted Successfully."
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

      alert(
        error.response?.data?.message ||
          "Failed to delete application."
      );
    }
  };

  // ==========================
  // Search Applications
  // ==========================
  const filteredApplications =
    applications.filter(
      (application) => {

        const applicantName =
          application.fullName || "";

        const email =
          application.email || "";

        const jobTitle =
          application.jobId?.title || "";

        const company =
          application.jobId?.company || "";

        const searchText =
          `${applicantName} ${email} ${jobTitle} ${company}`
            .toLowerCase();

        return searchText.includes(
          search.toLowerCase()
        );
      }
    );

  // ==========================
  // Status Class
  // ==========================
  const getStatusClass = (
    status
  ) => {

    switch (status) {

      case "Reviewed":
        return "status-reviewed";

      case "Shortlisted":
        return "status-shortlisted";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-pending";
    }
  };

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

        <div className="recent-section">

          {/* ==========================
              HEADER
          ========================== */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >

            <div>

              <h2>
                Manage Applications
              </h2>

              <p
                style={{
                  marginTop: "5px",
                  color: "#64748b",
                }}
              >
                Total Applications:{" "}
                {applications.length}
              </p>

            </div>

          </div>

          {/* ==========================
              SEARCH
          ========================== */}

          <input
            type="text"
            placeholder="Search by applicant, email, job or company..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "10px",
              border:
                "1px solid #dbe4f0",
              marginBottom: "20px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* ==========================
              APPLICATION TABLE
          ========================== */}

          <div
            style={{
              overflowX: "auto",
            }}
          >

            <table>

              <thead>

                <tr>

                  <th>
                    Applicant
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Job
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredApplications.map(
                  (application) => {

                    const currentStatus =
                      application.status ||
                      "Pending";

                    return (
                      <tr
                        key={
                          application._id
                        }
                      >

                        {/* Applicant */}

                        <td>
                          {application.fullName ||
                            application.userId?.name ||
                            "N/A"}
                        </td>

                        {/* Email */}

                        <td>
                          {application.email ||
                            application.userId?.email ||
                            "N/A"}
                        </td>

                        {/* Job */}

                        <td>
                          {application
                            .jobId?.title ||
                            "N/A"}
                        </td>

                        {/* Company */}

                        <td>
                          {application
                            .jobId?.company ||
                            "N/A"}
                        </td>

                        {/* Location */}

                        <td>
                          {application
                            .jobId?.location ||
                            "N/A"}
                        </td>

                        {/* Status */}

                        <td>

                          <select
                            value={
                              currentStatus
                            }
                            onChange={(e) =>
                              updateStatus(
                                application._id,
                                e.target.value
                              )
                            }
                            className={
                              `application-status ${getStatusClass(
                                currentStatus
                              )}`
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

                        </td>

                        {/* Action */}

                        <td>

                          <button
                            className="details-btn"
                            onClick={() =>
                              navigate(
                                `/admin/applications/${application._id}`
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            className="apply-btn"
                            style={{
                              marginLeft:
                                "10px",
                            }}
                            onClick={() =>
                              deleteApplication(
                                application._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    );
                  }
                )}

                {/* ==========================
                    NO APPLICATIONS
                ========================== */}

                {filteredApplications.length ===
                  0 && (

                  <tr>

                    <td
                      colSpan="7"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "30px",
                      }}
                    >
                      No Applications Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageApplications;

