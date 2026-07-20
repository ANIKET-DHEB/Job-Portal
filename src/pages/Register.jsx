import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    skills: "",
    gender: "",
    terms: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Registration Successful 🎉");

    console.log(user);

    setUser({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      qualification: "",
      skills: "",
      gender: "",
      terms: false,
    });
  }

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Create Account 🚀</h1>
        <p>Register to apply for your dream job.</p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={user.phone}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />

          <label>Highest Qualification</label>

          <select
            name="qualification"
            value={user.qualification}
            onChange={handleChange}
            required
          >
            <option value="">Select Qualification</option>
            <option>BCA</option>
            <option>B.Tech</option>
            <option>B.Sc</option>
            <option>MCA</option>
            <option>M.Tech</option>
          </select>

          <label>Skills</label>

          <input
            type="text"
            name="skills"
            placeholder="React, JavaScript, Node..."
            value={user.skills}
            onChange={handleChange}
          />

          <label>Gender</label>

          <div className="gender-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={user.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={user.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={user.gender === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>

          <label className="terms">
            <input
              type="checkbox"
              name="terms"
              checked={user.terms}
              onChange={handleChange}
              required
            />
            I agree to the Terms & Conditions
          </label>

          <button type="submit"    className="login-btn">
            Create Account
          </button>

        </form>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;