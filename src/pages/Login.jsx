import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    // Clear error while typing
    setErrors({
      ...errors,
      [name]: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    // Email Validation
    if (user.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    // Password Validation
    if (user.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // If validation fails
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success
    alert("Login Successful 🎉");

    console.log(user);

    // Reset form
    setUser({
      email: "",
      password: "",
    });

    setErrors({});
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back 👋</h1>
        <p>Login to continue to your account.</p>

        <form onSubmit={handleSubmit} noValidate>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="error">{errors.email}</p>
          )}

          <label>Password</label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p className="error">{errors.password}</p>
          )}

          <div className="login-options">
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        <p className="register-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;