import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import logo from "../assets/job-logo.png";

import {
  FaBars,
  FaTimes,
  FaBriefcase,
  FaHome,
  FaUser,
  FaSignInAlt,
  FaHeart,
  FaClipboardList,
  FaTachometerAlt,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";
import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  // ==========================
  // NORMAL USER TOKEN
  // ==========================

  const token = localStorage.getItem("userToken");

  // ==========================
  // LOGGED-IN USER
  // ==========================

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.log("USER DATA ERROR:", error);
    user = null;
  }

  // ==========================
  // CLOSE MENU
  // ==========================

  function closeMenu() {
    setMenuOpen(false);
    setProfileOpen(false);
  }

  // ==========================
  // LOGOUT
  // ==========================

  function handleLogout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");

    setMenuOpen(false);
    setProfileOpen(false);

    alert("Logged Out Successfully");

    navigate("/login");

    window.location.reload();
  }

  // ==========================
  // ACTIVE LINK CLASS
  // ==========================

  const getNavClass = ({ isActive }) =>
    isActive ? "saved-link active" : "saved-link";

  return (
    <nav className="navbar">

      {/* ==========================
          LOGO
      ========================== */}

     <Link 
  to="/" 
  className="logo" 
  onClick={closeMenu}
>
  <img 
    src={logo} 
    alt="Job Portal Logo" 
  />

  <span>Job Portal</span>
</Link>


      {/* ==========================
          NAVIGATION
      ========================== */}

      <div
        className={
          menuOpen
            ? "nav-links active"
            : "nav-links"
        }
      >

        {/* ==========================
            HOME
        ========================== */}

        <NavLink
          to="/"
          className={getNavClass}
          onClick={closeMenu}
          end
        >
          <FaHome />
          Home
        </NavLink>


        {/* ==========================
            JOBS
        ========================== */}

        <NavLink
          to="/jobs"
          className={getNavClass}
          onClick={closeMenu}
        >
          <FaBriefcase />
          Jobs
        </NavLink>


        {/* ==========================
            USER NOT LOGGED IN
        ========================== */}

        {!token ? (
          <>

            {/* LOGIN */}

            <NavLink
              to="/login"
              className={getNavClass}
              onClick={closeMenu}
            >
              <FaSignInAlt />
              Login
            </NavLink>


            {/* REGISTER */}

            <NavLink
              to="/register"
              className={getNavClass}
              onClick={closeMenu}
            >
              <FaUser />
              Register
            </NavLink>

          </>
        ) : (

          /* ==========================
             USER LOGGED IN
          ========================== */

          <>

            {/* ==========================
                DASHBOARD
            ========================== */}

            <NavLink
              to="/dashboard"
              className={getNavClass}
              onClick={closeMenu}
            >
              <FaTachometerAlt />
              Dashboard
            </NavLink>


            {/* ==========================
                SAVED JOBS
            ========================== */}

            <NavLink
              to="/saved-jobs"
              className={getNavClass}
              onClick={closeMenu}
            >
              <FaHeart />
              Saved Jobs
            </NavLink>


            {/* ==========================
                MY APPLICATIONS
            ========================== */}

            <NavLink
              to="/my-applications"
              className={getNavClass}
              onClick={closeMenu}
            >
              <FaClipboardList />
              My Applications
            </NavLink>


            {/* ==========================
                PROFILE MENU
            ========================== */}

            <div className="user-menu">

              <button
                className="user-menu-btn"
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
              >

                {/* USER AVATAR */}

                <div className="user-avatar">

                  {user?.name
                    ? user.name
                        .split(" ")
                        .map(
                          (word) =>
                            word[0]
                        )
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : "U"}

                </div>


                {/* USER INFORMATION */}

                <div className="user-info">

                  <h4>
                    {user?.name
                      ?.split(" ")[0] ||
                      "User"}
                  </h4>

                  <p>
                    Job Seeker
                  </p>

                </div>


                {/* ARROW */}

                <FaChevronDown
                  className={
                    profileOpen
                      ? "user-arrow rotate"
                      : "user-arrow"
                  }
                />

              </button>


              {/* ==========================
                  DROPDOWN
              ========================== */}

              {profileOpen && (

                <div className="user-dropdown">

                  {/* PROFILE */}

                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "dropdown-active" : ""
                    }
                    onClick={closeMenu}
                  >
                    <FaUser />
                    My Profile
                  </NavLink>


                  {/* DASHBOARD */}

                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? "dropdown-active" : ""
                    }
                    onClick={closeMenu}
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </NavLink>


                  {/* SAVED JOBS */}

                  <NavLink
                    to="/saved-jobs"
                    className={({ isActive }) =>
                      isActive ? "dropdown-active" : ""
                    }
                    onClick={closeMenu}
                  >
                    <FaHeart />
                    Saved Jobs
                  </NavLink>


                  {/* APPLICATIONS */}

                  <NavLink
                    to="/my-applications"
                    className={({ isActive }) =>
                      isActive ? "dropdown-active" : ""
                    }
                    onClick={closeMenu}
                  >
                    <FaClipboardList />
                    My Applications
                  </NavLink>


                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>

                </div>

              )}

            </div>

          </>
        )}

      </div>


      {/* ==========================
          THEME TOGGLE
      ========================== */}

      <button
        className="theme-btn"
        onClick={toggleTheme}
      >

        <div
          className={
            darkMode
              ? "toggle active"
              : "toggle"
          }
        >

          <div className="toggle-circle">

            {darkMode
              ? "🌙"
              : "☀️"}

          </div>

        </div>

      </button>


      {/* ==========================
          MOBILE MENU
      ========================== */}

      <div
        className="hamburger"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        {menuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}

      </div>

    </nav>
  );
}

export default Navbar;