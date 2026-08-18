import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================
  // Handle Input Change
  // ==========================

  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  }

  // ==========================
  // Login
  // ==========================

  async function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    // ==========================
    // Email Validation
    // ==========================

    if (user.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        user.email
      )
    ) {
      newErrors.email = "Please enter a valid email";
    }

    // ==========================
    // Password Validation
    // ==========================

    if (user.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // ==========================
    // Stop If Validation Error
    // ==========================

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      // ==========================
      // Normal User Login
      // ==========================

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        user
      );

      // ==========================
      // Remove Old User Token
      // ==========================

      localStorage.removeItem("userToken");

      // ==========================
      // Save User JWT
      // ==========================

      localStorage.setItem(
        "userToken",
        res.data.token
      );

      // ==========================
      // Save User Information
      // ==========================

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // ==========================
      // Remove Admin Information
      // ==========================

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");

      // ==========================
      // Success
      // ==========================

      alert(
        res.data.message ||
          "Login Successful 🎉"
      );

      navigate("/dashboard");

    } catch (err) {
      console.log(
        "USER LOGIN ERROR:",
        err
      );

      console.log(
        "SERVER RESPONSE:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
          "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">

      {/* ==========================
          BACKGROUND DECORATION
      ========================== */}

      <div className="login-bg-circle circle-one"></div>
      <div className="login-bg-circle circle-two"></div>

      {/* ==========================
          LOGIN CARD
      ========================== */}

      <div className="login-card">

        {/* ==========================
            LOGO
        ========================== */}

        <div className="login-logo">
          <div className="login-logo-icon">
            <FaBriefcase />
          </div>

          <span>JobPortal</span>
        </div>

        {/* ==========================
            HEADER
        ========================== */}

        <div className="login-header">

          <h1>
            Welcome Back
            <span> 👋</span>
          </h1>

          <p>
            Login to continue your job search
          </p>

        </div>

        {/* ==========================
            FORM
        ========================== */}

        <form
          onSubmit={handleSubmit}
          noValidate
        >

          {/* ==========================
              EMAIL
          ========================== */}

          <div className="login-form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <div
              className={`login-input-wrapper ${
                errors.email
                  ? "input-error"
                  : ""
              }`}
            >

              <FaEnvelope className="input-icon" />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
              />

            </div>

            {errors.email && (
              <p className="error">
                {errors.email}
              </p>
            )}

          </div>

          {/* ==========================
              PASSWORD
          ========================== */}

          <div className="login-form-group">

            <label htmlFor="password">
              Password
            </label>

            <div
              className={`login-input-wrapper ${
                errors.password
                  ? "input-error"
                  : ""
              }`}
            >

              <FaLock className="input-icon" />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}

              </button>

            </div>

            {errors.password && (
              <p className="error">
                {errors.password}
              </p>
            )}

          </div>

          {/* ==========================
              LOGIN BUTTON
          ========================== */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="login-spinner"></span>
                Logging in...
              </>
            ) : (
              <>
                Login
                <FaArrowRight />
              </>
            )}

          </button>

        </form>

        {/* ==========================
            REGISTER
        ========================== */}

        <div className="register-link">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;

