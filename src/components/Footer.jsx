import React from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaArrowRight,
} from "react-icons/fa";

import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =========================
            BRAND
        ========================= */}

        <div className="footer-about">

          <Link to="/" className="footer-logo">
            Job<span>Portal</span>
          </Link>

          <p>
            Find the right job, discover new opportunities,
            and build the career you deserve.
          </p>

          <Link to="/jobs" className="footer-find-jobs">
            Find Jobs
            <FaArrowRight />
          </Link>

        </div>


        {/* =========================
            FOR CANDIDATES
        ========================= */}

        <div className="footer-links">

          <h3>For Candidates</h3>

          <Link to="/jobs">
            Search Jobs
          </Link>

          <Link to="/company/Google">
            Browse Companies
          </Link>

          <Link to="/profile">
            My Profile
          </Link>

          <Link to="/my-applications">
            My Applications
          </Link>

        </div>


        {/* =========================
            JOB CATEGORIES
        ========================= */}

        <div className="footer-links">

          <h3>Job Categories</h3>

          <Link to="/jobs">
            All Jobs
          </Link>

          <Link to="/jobs">
            Frontend Developer
          </Link>

          <Link to="/jobs">
            Backend Developer
          </Link>

          <Link to="/jobs">
            Full Stack Developer
          </Link>

          <Link to="/jobs">
            Java Developer
          </Link>

          <Link to="/jobs">
            Flutter Developer
          </Link>

        </div>


        {/* =========================
            COMPANY
        ========================= */}

        <div className="footer-links">

          <h3>Company</h3>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <p>
          © 2026 JobPortal. All rights reserved.
        </p>

        <div className="social-icons">

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

        </div>

      </div>

    </footer>
  );
};

export default Footer;