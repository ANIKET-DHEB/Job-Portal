import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../../styles/Admin.css";

function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAdminToken = () => {
    return localStorage.getItem("adminToken");
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = getAdminToken();

      if (!token) {
        alert("Admin session not found. Please login again.");
        navigate("/admin");
        return;
      }

      const res = await axios.get(
        "https://job-portal-backend-qlnk.onrender.com/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ADMIN APPLICATIONS:", res.data.applications);
      setApplications(res.data.applications || []);
    } catch (error) {
      console.log("FETCH APPLICATIONS ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        alert("Admin session expired. Please login again.");
        navigate("/admin");
        return;
      }

      if (error.response?.status === 403) {
        alert("You are not authorized to access applications.");
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

  const updateStatus = async (id, status) => {
    try {
      const token = getAdminToken();

      if (!token) {
        alert("Admin session not found. Please login again.");
        navigate("/admin");
        return;
      }

      await axios.put(
        `https://job-portal-backend-qlnk.onrender.com/api/applications/${id}/status`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === id
            ? {
                ...application,
                status: status,
              }
            : application
        )
      );
    } catch (error) {
      console.log("UPDATE STATUS ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Failed to update application status."
      );
    }
  };

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getAdminToken();

      if (!token) {
        alert("Admin session not found. Please login again.");
        navigate("/admin");
        return;
      }

      await axios.delete(
        `https://job-portal-backend-qlnk.onrender.com/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prevApplications) =>
        prevApplications.filter(
          (application) => application._id !== id
        )
      );

      alert("Application Deleted Successfully.");
    } catch (error) {
      console.log("DELETE APPLICATION ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Failed to delete application."
      );
    }
  };

  const filteredApplications = applications.filter(
    (application) => {
      const applicantName = application.fullName || "";
      const email = application.email || "";
      const jobTitle = application.jobId?.title || "";
      const company = application.jobId?.company || "";

      const searchText =
        `${applicantName} ${email} ${jobTitle} ${company}`.toLowerCase();

      return searchText.includes(search.toLowerCase());
    }
  );

  const getStatusClass = (status) => {
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
      <AdminSidebar />

      <div className="admin-content">
        <AdminNavbar />

        <div className="recent-section manage-applications-section">
          <div
            className="manage-page-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2>Manage Applications</h2>

              <p
                style={{
                  marginTop: "5px",
                  color: "#64748b",
                }}
              >
                {loading
                  ? "Loading applications..."
                  : `Total Applications: ${applications.length}`}
              </p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search by applicant, email, job or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "1px solid #dbe4f0",
              marginBottom: "20px",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <div className="admin-table-container">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Email</th>
                  <th>Job</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                      }}
                    >
                      <h3>⏳ Loading Applications...</h3>

                      <p
                        style={{
                          marginTop: "8px",
                          color: "#64748b",
                        }}
                      >
                        Please wait while applications are loading.
                      </p>
                    </td>
                  </tr>
                ) : filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => {
                    const currentStatus =
                      application.status || "Pending";

                    return (
                      <tr key={application._id}>
                        <td data-label="Applicant">
                          <span className="mobile-table-value">
                            {application.fullName ||
                              application.userId?.name ||
                              "N/A"}
                          </span>
                        </td>

                        <td data-label="Email">
                          <span className="mobile-table-value">
                            {application.email ||
                              application.userId?.email ||
                              "N/A"}
                          </span>
                        </td>

                        <td data-label="Job">
                          <span className="mobile-table-value">
                            {application.jobId?.title || "N/A"}
                          </span>
                        </td>

                        <td data-label="Company">
                          <span className="mobile-table-value">
                            {application.jobId?.company || "N/A"}
                          </span>
                        </td>

                        <td data-label="Location">
                          <span className="mobile-table-value">
                            {application.jobId?.location || "N/A"}
                          </span>
                        </td>

                        <td data-label="Status">
                          <select
                            value={currentStatus}
                            onChange={(e) =>
                              updateStatus(
                                application._id,
                                e.target.value
                              )
                            }
                            className={`application-status ${getStatusClass(
                              currentStatus
                            )}`}
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

                        <td data-label="Action">
                          <div className="mobile-action-buttons">
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
                              onClick={() =>
                                deleteApplication(
                                  application._id
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "30px",
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