import React from "react";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaQuestionCircle,
} from "react-icons/fa";

import "../styles/StaticPages.css";

function Contact() {
  return (
    <div className="static-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="static-hero">

        <div className="static-hero-content">

          <span className="static-badge">
            Get In Touch
          </span>

          <h1>
            Contact <span>Us</span>
          </h1>

          <p>
            Have a question or need assistance?
            Our JobPortal team is here to help you.
          </p>

        </div>

      </section>


      {/* =========================
          CONTACT CONTENT
      ========================= */}

      <section className="static-container">

        <div className="contact-page-content">

          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="contact-info">

            <span className="section-label">
              Contact Information
            </span>

            <h2>
              Let's Talk
            </h2>

            <p>
              If you have any questions about JobPortal,
              job applications, your account, or any other
              issue, feel free to contact our team.
            </p>


            {/* EMAIL */}

            <div className="contact-item">

              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <div>
                <span>Email</span>

                <strong>
                  jobportal2601@gmail.com
                </strong>
              </div>

            </div>


            {/* PHONE */}

            <div className="contact-item">

              <div className="contact-icon">
                <FaPhone />
              </div>

              <div>
                <span>Phone</span>

                <strong>
                  +91 9156379907
                </strong>
              </div>

            </div>


            {/* LOCATION */}

            <div className="contact-item">

              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>Location</span>

                <strong>
                  Mumbai, Maharashtra, India
                </strong>
              </div>

            </div>


            {/* WORKING HOURS */}

            <div className="contact-item">

              <div className="contact-icon">
                <FaClock />
              </div>

              <div>
                <span>Working Hours</span>

                <strong>
                  Monday - Saturday, 10:00 AM - 6:00 PM
                </strong>
              </div>

            </div>

          </div>


          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="contact-help-card">

            <div className="contact-help-icon">
              <FaQuestionCircle />
            </div>

            <h2>
              How Can We Help?
            </h2>

            <p>
              Our team is available to help you with
              questions related to job applications,
              account issues, job postings, and other
              JobPortal services.
            </p>


            <div className="contact-help-list">

              <div>
                <span>01</span>

                <p>
                  Questions about job applications
                </p>
              </div>

              <div>
                <span>02</span>

                <p>
                  Account or profile assistance
                </p>
              </div>

              <div>
                <span>03</span>

                <p>
                  Issues with finding or applying for jobs
                </p>
              </div>

              <div>
                <span>04</span>

                <p>
                  General JobPortal support
                </p>
              </div>

            </div>


            <div className="contact-help-footer">

              <span>
                Need assistance?
              </span>

              <strong>
                jobportal2601@gmail.com
              </strong>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;