import React from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaUsers,
  FaSearch,
  FaRocket,
} from "react-icons/fa";

import "../styles/StaticPages.css";

function About() {
  return (
    <div className="static-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="static-hero">

        <div className="static-hero-content">

          <span className="static-badge">
            About JobPortal
          </span>

          <h1>
            Helping You Find Your
            <span> Dream Career</span>
          </h1>

          <p>
            JobPortal is a modern job platform designed to
            connect talented candidates with great career
            opportunities from leading companies.
          </p>

        </div>

      </section>


      {/* =========================
          ABOUT CONTENT
      ========================= */}

      <section className="static-container">

        <div className="about-intro">

          <div>

            <span className="section-label">
              Who We Are
            </span>

            <h2>
              Your Career Journey Starts Here
            </h2>

            <p>
              JobPortal makes job searching simple, accessible,
              and efficient. Our platform brings together job
              seekers and employers in one convenient place.
            </p>

            <p>
              Whether you are a fresher looking for your first
              opportunity or an experienced professional looking
              for your next challenge, JobPortal helps you
              discover opportunities that match your skills
              and career goals.
            </p>

            <Link
              to="/jobs"
              className="static-primary-btn"
            >
              Explore Jobs
            </Link>

          </div>

          <div className="about-visual">

            <div className="about-icon">
              <FaBriefcase />
            </div>

            <h3>
              Build Your Future
            </h3>

            <p>
              Discover opportunities, apply with confidence,
              and take the next step in your career.
            </p>

          </div>

        </div>


        {/* =========================
            FEATURES
        ========================= */}

        <div className="static-section-heading">

          <span className="section-label">
            What We Offer
          </span>

          <h2>
            Everything You Need to Find the Right Job
          </h2>

        </div>


        <div className="about-features">

          <div className="about-feature-card">

            <div className="feature-icon">
              <FaSearch />
            </div>

            <h3>
              Find Opportunities
            </h3>

            <p>
              Search through job opportunities from
              different companies and industries.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="feature-icon">
              <FaUsers />
            </div>

            <h3>
              Connect With Companies
            </h3>

            <p>
              Explore companies and discover opportunities
              that match your career interests.
            </p>

          </div>


          <div className="about-feature-card">

            <div className="feature-icon">
              <FaRocket />
            </div>

            <h3>
              Grow Your Career
            </h3>

            <p>
              Apply for suitable positions and take the
              next step toward your professional goals.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;