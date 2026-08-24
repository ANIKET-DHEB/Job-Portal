import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";

import DashboardCard from "../components/DashboardCard";
import RecentApplication from "../components/RecentApplication";

import { SavedJobsContext } from "../context/SavedJobsContext";

import {
  FaBriefcase,
  FaHeart,
  FaUserCheck,
  FaBuilding,
  FaUserCircle,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // ==========================
  // LOADING STATE
  // ==========================

  const [loading, setLoading] = useState(true);

  const { savedJobs } = useContext(SavedJobsContext);

  // ==========================
  // Logged-in User
  // ==========================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ==========================
  // Fetch Dashboard Data
  // ==========================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // ==========================
      // Get NORMAL USER Token
      // ==========================

      const token = localStorage.getItem(
        "userToken"
      );

      console.log(
        "Dashboard User Token:",
        token
      );

      if (!token) {
        console.log(
          "No user login token found"
        );

        navigate("/login");

        return;
      }

      // ==========================
      // Authorization Header
      // ==========================

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // ==========================
      // Get Jobs
      // ==========================

      const jobsRes = await axios.get(
        "https://job-portal-backend-qlnk.onrender.com/api/jobs"
      );

      setJobs(
        jobsRes.data.jobs || []
      );

      // ==========================
      // Get Logged-in User
      // Applications
      // ==========================

      const applicationsRes =
        await axios.get(
          "https://job-portal-backend-qlnk.onrender.com/api/applications",
          config
        );

      console.log(
        "Dashboard Applications:",
        applicationsRes.data.applications
      );

      setApplications(
        applicationsRes.data.applications || []
      );

    } catch (error) {
      console.log(
        "Dashboard Data Error:",
        error
      );

      console.log(
        "Server Response:",
        error.response?.data
      );

      // ==========================
      // Token Expired / Invalid
      // ==========================

      if (
        error.response?.status === 401
      ) {
        localStorage.removeItem(
          "userToken"
        );

        localStorage.removeItem(
          "user"
        );

        alert(
          "Your login session has expired. Please login again."
        );

        navigate("/login");
      }

    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Company Count
  // ==========================

  const companyCount = [
    ...new Set(
      jobs
        .map((job) => job.company)
        .filter(Boolean)
    ),
  ].length;

  // ==========================
  // Today's Date
  // ==========================

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  // ==========================
  // Greeting
  // ==========================

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  // ==========================
  // Profile Completion
  // ==========================

  let completion = 40;

  if (user?.name) completion += 10;

  if (user?.email) completion += 10;

  if (applications.length > 0)
    completion += 10;

  if (savedJobs.length > 0)
    completion += 10;

  if (completion > 100)
    completion = 100;

  // ==========================
  // Status Class
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

  return (
    <div className="dashboard-container">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="dashboard-header">

        <div>

          <h1>
            {greeting},{" "}
            {user?.name || "User"} 👋
          </h1>

          <p>
            {today}
          </p>

          <span className="dashboard-subtitle">
            Manage your jobs, applications
            and profile from one place.
          </span>

        </div>

        <div className="profile-completion-card">

          <FaUserCircle />

          <h2>
            {completion}%
          </h2>

          <p>
            Profile Complete
          </p>

        </div>

      </div>

      {/* ==========================
          STATISTICS
      ========================== */}

      <div className="dashboard-grid">

        <DashboardCard
          title="Applied Jobs"
          count={
            loading
              ? "..."
              : applications.length
          }
          icon={<FaBriefcase />}
        />

        <DashboardCard
          title="Saved Jobs"
          count={
            loading
              ? "..."
              : savedJobs.length
          }
          icon={<FaHeart />}
        />

        <DashboardCard
          title="Total Jobs"
          count={
            loading
              ? "..."
              : jobs.length
          }
          icon={<FaUserCheck />}
        />

        <DashboardCard
          title="Companies"
          count={
            loading
              ? "..."
              : companyCount
          }
          icon={<FaBuilding />}
        />

      </div>

      {/* ==========================
          QUICK ACTIONS
      ========================== */}

      <div className="quick-actions">

        <h2>
          Quick Actions
        </h2>

        <div className="action-buttons">

          <button
            onClick={() =>
              navigate("/jobs")
            }
          >
            Browse Jobs
          </button>

          <button
            onClick={() =>
              navigate("/saved-jobs")
            }
          >
            Saved Jobs
          </button>

          <button
            onClick={() =>
              navigate("/my-applications")
            }
          >
            Applications
          </button>

          <button
            onClick={() =>
              navigate("/profile")
            }
          >
            Edit Profile
          </button>

        </div>

      </div>

      {/* ==========================
          RECOMMENDED JOBS
      ========================== */}

      <div className="recommended-section">

        <h2>
          Recommended Jobs
        </h2>

        {loading ? (

          <p>
            ⏳ Loading recommended jobs...
          </p>

        ) : (

          <div className="recommended-grid">

            {jobs
              .slice(0, 4)
              .map((job) => (

                <div
                  key={job._id}
                  className="recommended-card"
                  onClick={() =>
                    navigate(
                      `/jobs/${job._id}`
                    )
                  }
                >

                  <h3>
                    {job.title}
                  </h3>

                  <p>
                    {job.company}
                  </p>

                  <span>
                    {job.location}
                  </span>

                </div>

              ))}

          </div>

        )}

      </div>

      {/* ==========================
          RECENT APPLICATIONS
      ========================== */}

      <div className="recent-applications">

        <h2>
          Recent Applications
        </h2>

        {loading ? (

          <p>
            ⏳ Loading applications...
          </p>

        ) : applications.length > 0 ? (

          applications
            .slice(0, 5)
            .map((application) => (

              <RecentApplication
                key={application._id}

                title={
                  application.jobId?.title ||
                  "Job Title"
                }

                company={
                  application.jobId?.company ||
                  "Company"
                }

                status={
                  application.status ||
                  "Pending"
                }

                statusClass={getStatusClass(
                  application.status
                )}

              />

            ))

        ) : (

          <p>
            No Applications Yet.
          </p>

        )}

      </div>

    </div>
  );
}

export default Dashboard;