import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminCard from "../components/AdminCard";

import {
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaBuilding,
  FaUserCheck,
} from "react-icons/fa";

import "../../styles/Admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.log("❌ No admin login token found");
        alert("Please login first.");
        navigate("/admin");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [jobsRes, usersRes, applicationsRes] =
        await Promise.all([
          axios.get(
            "https://job-portal-backend-qlnk.onrender.com/api/jobs"
          ),
          axios.get(
            "https://job-portal-backend-qlnk.onrender.com/api/auth/users",
            config
          ),
          axios.get(
            "https://job-portal-backend-qlnk.onrender.com/api/applications",
            config
          ),
        ]);

      setJobs(jobsRes.data.jobs || []);
      setUsers(usersRes.data.users || []);
      setApplications(
        applicationsRes.data.applications || []
      );

      console.log("✅ Dashboard Data Loaded");
    } catch (error) {
      console.log("Dashboard Data Error:", error);
      console.log(
        "Server Response:",
        error.response?.data
      );

      if (error.response?.status === 401) {
        alert(
          "Your admin login session has expired. Please login again."
        );

        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        localStorage.removeItem("adminUser");

        navigate("/admin");
      }
    } finally {
      setLoading(false);
    }
  };

  const companyCount = [
    ...new Set(
      jobs
        .map((job) => job.company)
        .filter(Boolean)
    ),
  ].length;

  const shortlistedCount =
    applications.filter(
      (application) =>
        application.status === "Shortlisted"
    ).length;

  const recentJobs = [...jobs]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  const recentApplications =
    [...applications]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

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

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <h2>
              ⏳ Loading Admin Dashboard...
            </h2>

            <p
              style={{
                marginTop: "10px",
                color: "#64748b",
              }}
            >
              Please wait while dashboard data is loading.
            </p>
          </div>
        ) : (
          <>

            {/* ==========================
                DASHBOARD CARDS
            ========================== */}

            <div className="admin-cards">

              <AdminCard
                title="Total Jobs"
                count={jobs.length}
                icon={<FaBriefcase />}
              />

              <AdminCard
                title="Total Users"
                count={users.length}
                icon={<FaUsers />}
              />

              <AdminCard
                title="Applications"
                count={applications.length}
                icon={<FaFileAlt />}
              />

              <AdminCard
                title="Companies"
                count={companyCount}
                icon={<FaBuilding />}
              />

              <AdminCard
                title="Shortlisted"
                count={shortlistedCount}
                icon={<FaUserCheck />}
              />

            </div>

            {/* ==========================
                RECENT JOBS
            ========================== */}

            <div className="recent-section dashboard-section">

              <div className="dashboard-section-header">

                <div>
                  <h2>
                    Recent Jobs
                  </h2>

                  <p>
                    Latest jobs added to the portal
                  </p>
                </div>

                <button
                  className="dashboard-view-btn"
                  onClick={() =>
                    navigate("/admin/jobs")
                  }
                >
                  View All
                </button>

              </div>

              {/* DESKTOP TABLE */}

              <div className="dashboard-table-wrapper dashboard-desktop-table">

                <table>

                  <thead>
                    <tr>
                      <th>Job</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Type</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentJobs.length > 0 ? (
                      recentJobs.map((job) => (
                        <tr key={job._id}>

                          <td>
                            {job.title}
                          </td>

                          <td>
                            {job.company}
                          </td>

                          <td>
                            {job.location}
                          </td>

                          <td>
                            {job.jobType || "N/A"}
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                            padding: "25px",
                          }}
                        >
                          No Jobs Found
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

              {/* MOBILE CARDS */}

              <div className="dashboard-mobile-list">

                {recentJobs.length > 0 ? (
                  recentJobs.map((job) => (
                    <div
                      className="dashboard-mobile-card"
                      key={job._id}
                    >

                      <div className="mobile-card-title">
                        {job.title || "N/A"}
                      </div>

                      <div className="mobile-card-row">
                        <span>Company</span>
                        <strong>
                          {job.company || "N/A"}
                        </strong>
                      </div>

                      <div className="mobile-card-row">
                        <span>Location</span>
                        <strong>
                          {job.location || "N/A"}
                        </strong>
                      </div>

                      <div className="mobile-card-row">
                        <span>Type</span>
                        <strong>
                          {job.jobType || "N/A"}
                        </strong>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="dashboard-empty">
                    No Jobs Found
                  </div>
                )}

              </div>

            </div>

            {/* ==========================
                RECENT APPLICATIONS
            ========================== */}

            <div className="recent-section dashboard-section">

              <div className="dashboard-section-header">

                <div>
                  <h2>
                    Recent Applications
                  </h2>

                  <p>
                    Latest applications received
                  </p>
                </div>

                <button
                  className="dashboard-view-btn"
                  onClick={() =>
                    navigate("/admin/applications")
                  }
                >
                  View All
                </button>

              </div>

              {/* DESKTOP TABLE */}

              <div className="dashboard-table-wrapper dashboard-desktop-table">

                <table>

                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Job</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentApplications.length > 0 ? (
                      recentApplications.map(
                        (application) => {

                          const currentStatus =
                            application.status ||
                            "Pending";

                          return (
                            <tr
                              key={application._id}
                            >

                              <td>
                                {
                                  application.fullName ||
                                  "N/A"
                                }
                              </td>

                              <td>
                                {
                                  application.jobId?.title ||
                                  "N/A"
                                }
                              </td>

                              <td>
                                {
                                  application.jobId?.company ||
                                  "N/A"
                                }
                              </td>

                              <td>
                                <span
                                  className={`application-status ${getStatusClass(
                                    currentStatus
                                  )}`}
                                >
                                  {currentStatus}
                                </span>
                              </td>

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
                              </td>

                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            textAlign: "center",
                            padding: "25px",
                          }}
                        >
                          No Applications Found
                        </td>
                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

              {/* MOBILE CARDS */}

              <div className="dashboard-mobile-list">

                {recentApplications.length > 0 ? (
                  recentApplications.map(
                    (application) => {

                      const currentStatus =
                        application.status ||
                        "Pending";

                      return (
                        <div
                          className="dashboard-mobile-card"
                          key={application._id}
                        >

                          <div className="mobile-card-title">
                            {application.fullName ||
                              "N/A"}
                          </div>

                          <div className="mobile-card-row">
                            <span>Job</span>
                            <strong>
                              {
                                application.jobId?.title ||
                                "N/A"
                              }
                            </strong>
                          </div>

                          <div className="mobile-card-row">
                            <span>Company</span>
                            <strong>
                              {
                                application.jobId?.company ||
                                "N/A"
                              }
                            </strong>
                          </div>

                          <div className="mobile-card-row">
                            <span>Status</span>

                            <span
                              className={`application-status ${getStatusClass(
                                currentStatus
                              )}`}
                            >
                              {currentStatus}
                            </span>
                          </div>

                          <button
                            className="details-btn mobile-view-btn"
                            onClick={() =>
                              navigate(
                                `/admin/applications/${application._id}`
                              )
                            }
                          >
                            View Application
                          </button>

                        </div>
                      );
                    }
                  )
                ) : (
                  <div className="dashboard-empty">
                    No Applications Found
                  </div>
                )}

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;