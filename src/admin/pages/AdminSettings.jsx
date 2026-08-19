import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/Admin.css";

function AdminSettings() {
  const navigate = useNavigate();

  const [adminName, setAdminName] =
    useState("Aniket");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  // ==========================
  // Change Password
  // ==========================
  const handlePasswordChange = async (
    e
  ) => {
    e.preventDefault();

    // ==========================
    // Check Empty Fields
    // ==========================
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert(
        "Please fill all password fields."
      );
      return;
    }

    // ==========================
    // Check New Password
    // ==========================
    if (
      newPassword !== confirmPassword
    ) {
      alert(
        "New password and confirm password do not match."
      );
      return;
    }

    // ==========================
    // Password Length
    // ==========================
    if (newPassword.length < 4) {
      alert(
        "Password must be at least 4 characters."
      );
      return;
    }

    try {
      // ==========================
      // Get Admin Token
      // ==========================
      const token =
        localStorage.getItem(
          "adminToken"
        );

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

      console.log(
        "Admin Token:",
        token
      );

      // ==========================
      // Change Password API
      // ==========================
      const res =
        await axios.put(
          "https://job-portal-backend-qlnk.onrender.com/api/auth/admin/change-password",
          {
            currentPassword:
              currentPassword,
            newPassword:
              newPassword,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        "CHANGE PASSWORD RESPONSE:",
        res.data
      );

      // ==========================
      // Success
      // ==========================
      alert(
        res.data.message ||
          "Password changed successfully!"
      );

      // ==========================
      // Clear Fields
      // ==========================
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.log(
        "CHANGE PASSWORD ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      // ==========================
      // Wrong Current Password
      // ==========================
      if (
        error.response?.status === 401
      ) {
        alert(
          error.response?.data?.message ||
            "Current password is incorrect."
        );

        return;
      }

      // ==========================
      // Admin Not Found
      // ==========================
      if (
        error.response?.status === 404
      ) {
        alert(
          error.response?.data?.message ||
            "Admin user not found."
        );

        return;
      }

      // ==========================
      // Other Error
      // ==========================
      alert(
        error.response?.data?.message ||
          "Failed to change password."
      );
    }
  };

  // ==========================
  // Save Profile
  // ==========================
  const handleProfileSave = (
    e
  ) => {
    e.preventDefault();

    alert(
      "Admin profile updated successfully!"
    );
  };

  // ==========================
  // Logout
  // ==========================
  const handleLogout = () => {
    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "admin"
    );

    localStorage.removeItem(
      "adminUser"
    );

    navigate("/admin");
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

        <div className="admin-settings-container">

          {/* ==========================
              PAGE HEADER
          ========================== */}

          <div className="settings-header">

            <h1>
              Admin Settings
            </h1>

            <p>
              Manage your admin profile and
              account settings.
            </p>

          </div>

          {/* ==========================
              ADMIN PROFILE
          ========================== */}

          <div className="settings-card">

            <div className="settings-card-header">

              <h2>
                Admin Profile
              </h2>

              <p>
                Update your administrator
                information.
              </p>

            </div>

            <form
              onSubmit={
                handleProfileSave
              }
            >

              <div className="settings-form-group">

                <label>
                  Admin Name
                </label>

                <input
                  type="text"
                  value={adminName}
                  onChange={(e) =>
                    setAdminName(
                      e.target.value
                    )
                  }
                  placeholder="Enter admin name"
                />

              </div>

              <div className="settings-form-group">

                <label>
                  Username
                </label>

                <input
                  type="text"
                  value="Aniket"
                  disabled
                />

              </div>

              <button
                type="submit"
                className="settings-save-btn"
              >
                Save Profile
              </button>

            </form>

          </div>

          {/* ==========================
              CHANGE PASSWORD
          ========================== */}

          <div className="settings-card">

            <div className="settings-card-header">

              <h2>
                Change Password
              </h2>

              <p>
                Update your admin login
                password.
              </p>

            </div>

            <form
              onSubmit={
                handlePasswordChange
              }
            >

              <div className="settings-form-group">

                <label>
                  Current Password
                </label>

                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="settings-form-group">

                <label>
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="settings-form-group">

                <label>
                  Confirm New Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

              </div>

              <button
                type="submit"
                className="settings-save-btn"
              >
                Change Password
              </button>

            </form>

          </div>

          {/* ==========================
              ACCOUNT
          ========================== */}

          <div className="settings-card danger-card">

            <div className="settings-card-header">

              <h2>
                Account
              </h2>

              <p>
                Manage your admin session.
              </p>

            </div>

            <button
              className="settings-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminSettings;

