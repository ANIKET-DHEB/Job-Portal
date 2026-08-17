import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/Admin.css";

import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaBuilding,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminSidebar() {
  const navigate = useNavigate();

  // ==========================
  // Admin Logout
  // ==========================
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    // ==========================
    // Remove Admin Login Session
    // ==========================
    localStorage.removeItem("admin");

    // ==========================
    // Go Directly To Admin Login
    // ==========================
    navigate("/admin");
  };

  return (
    <div className="admin-sidebar">

      {/* ==========================
          LOGO
      ========================== */}

      <div>

        <div className="admin-logo">
          <h2>
            JobPortal
          </h2>

          <span>
            Admin Panel
          </span>
        </div>

        {/* ==========================
            NAVIGATION
        ========================== */}

        <nav>

          <NavLink to="/admin/dashboard">
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink to="/admin/jobs">
            <FaBriefcase />
            Manage Jobs
          </NavLink>

          <NavLink to="/admin/users">
            <FaUsers />
            Users
          </NavLink>

          <NavLink to="/admin/applications">
            <FaFileAlt />
            Applications
          </NavLink>

          <NavLink to="/admin/companies">
            <FaBuilding />
            Companies
          </NavLink>

          <NavLink to="/admin/settings">
            <FaCog />
            Settings
          </NavLink>

        </nav>

      </div>

      {/* ==========================
          LOGOUT
      ========================== */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default AdminSidebar;