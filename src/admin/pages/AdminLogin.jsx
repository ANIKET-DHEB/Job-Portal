import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../styles/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ==========================
  // Admin Login
  // ==========================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ==========================
      // Admin Login Request
      // ==========================
      const res = await axios.post(
        "https://job-portal-backend-qlnk.onrender.com/api/auth/admin-login",
        {
          username,
          password,
        }
      );

      // ==========================
      // Save ADMIN JWT
      // ==========================
      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      // ==========================
      // Save Admin Flag
      // ==========================
      localStorage.setItem(
        "admin",
        "true"
      );

      // ==========================
      // Save Admin Information
      // ==========================
      localStorage.setItem(
        "adminUser",
        JSON.stringify(res.data.user)
      );

      // IMPORTANT:
      // DO NOT remove "token" here.
      //
      // "token" belongs to the normal user.
      // "adminToken" belongs to the admin.
      //
      // Keeping them separate prevents
      // Admin login from affecting the
      // normal user's dashboard.

      // ==========================
      // Success Message
      // ==========================
      alert(
        res.data.message ||
          "Admin Login Successful ✅"
      );

      // ==========================
      // Redirect Admin
      // ==========================
      navigate("/admin/dashboard");

    } catch (error) {

      console.log(
        "ADMIN LOGIN ERROR:",
        error
      );

      console.log(
        "SERVER RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Invalid Admin Username or Password ❌"
      );
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <h1>
          Admin Login
        </h1>

        <p>
          Login to access the Job Portal Admin Panel
        </p>

        <form onSubmit={handleLogin}>

          {/* ==========================
              USERNAME
          ========================== */}

          <div className="input-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* ==========================
              PASSWORD
          ========================== */}

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* ==========================
              LOGIN BUTTON
          ========================== */}

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;

