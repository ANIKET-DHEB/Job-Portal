import "../styles/Profile.css";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaGlobe,
  FaStar,
  FaBriefcase,
  FaArrowLeft,
} from "react-icons/fa";

function Profiles() {
  const { name } = useParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH JOBS
  // ==========================================

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();

        // Handle different API response structures
        const jobsData = Array.isArray(data)
          ? data
          : data.jobs || data.data || [];

        setJobs(jobsData);
      } catch (err) {
        console.error("Company jobs error:", err);

        setError(
          "Unable to load company information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ==========================================
  // COMPANY NAME
  // ==========================================

  const decodedName = decodeURIComponent(name || "")
    .trim()
    .toLowerCase();

  // ==========================================
  // FIND COMPANY JOBS
  // ==========================================

  const companyJobs = jobs.filter((job) => {
    return (
      job.company &&
      job.company.trim().toLowerCase() === decodedName
    );
  });

  // ==========================================
  // GET ACTUAL COMPANY NAME
  // ==========================================

  const companyName =
    companyJobs.length > 0
      ? companyJobs[0].company
      : decodeURIComponent(name || "");

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="company-loading">
        <div className="company-loading-card">
          <div className="company-loader"></div>

          <h2>Loading Company...</h2>

          <p>
            Please wait while we load company information.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="company-not-found">
        <div className="not-found-card">

          <div className="not-found-icon">
            ⚠️
          </div>

          <h1>Something Went Wrong</h1>

          <p>{error}</p>

          <Link
            to="/jobs"
            className="browse-jobs-btn"
          >
            Browse Jobs
          </Link>

        </div>
      </div>
    );
  }

  // ==========================================
  // COMPANY NOT FOUND
  // ==========================================

  if (companyJobs.length === 0) {
    return (
      <div className="company-not-found">

        <div className="not-found-card">

          <div className="not-found-icon">
            🏢
          </div>

          <h1>Company Not Found</h1>

          <p>
            Sorry, we couldn't find any jobs for{" "}
            <strong>{companyName}</strong>.
          </p>

          <Link
            to="/jobs"
            className="browse-jobs-btn"
          >
            Browse Jobs
          </Link>

        </div>

      </div>
    );
  }

  // ==========================================
  // COMPANY INFORMATION
  // ==========================================

  const locations = [
    ...new Set(
      companyJobs
        .map((job) => job.location)
        .filter(Boolean)
    ),
  ];

  const jobTypes = [
    ...new Set(
      companyJobs
        .map((job) => job.jobType)
        .filter(Boolean)
    ),
  ];

  // ==========================================
  // COMPANY WEBSITE
  // ==========================================

  const companyWebsites = {
    Google: "https://www.google.com",
    Microsoft: "https://www.microsoft.com",
    Amazon: "https://www.amazon.com",
    Infosys: "https://www.infosys.com",
    Accenture: "https://www.accenture.com",
    TCS: "https://www.tcs.com",
    Capgemini: "https://www.capgemini.com",
    Adobe: "https://www.adobe.com",
    Wipro: "https://www.wipro.com",
    Deloitte: "https://www.deloitte.com",
    IBM: "https://www.ibm.com",
    Cognizant: "https://www.cognizant.com",
    Zoho: "https://www.zoho.com",
    Oracle: "https://www.oracle.com",
    "Tech Mahindra": "https://www.techmahindra.com",
    "HCL Technologies": "https://www.hcltech.com",
    Webkul: "https://webkul.com",
    Razorpay: "https://razorpay.com",
    WebFX: "https://www.webfx.com",
    "Reliance Jio": "https://www.jio.com",
    Paytm: "https://paytm.com",
    Apple: "https://www.apple.com",
    KPMG: "https://kpmg.com",
    NVIDIA: "https://www.nvidia.com",
    OpenAI: "https://openai.com",
    Cisco: "https://www.cisco.com",
    EY: "https://www.ey.com",
    "Dell Technologies": "https://www.dell.com",
    Canva: "https://www.canva.com",
    Flipkart: "https://www.flipkart.com",
    Siemens: "https://www.siemens.com",
    LTIMindtree: "https://www.ltimindtree.com",
    Godrej: "https://www.godrej.com",
  };

  const website =
    companyWebsites[companyName] || null;

  // ==========================================
  // COMPANY LOGO
  // ==========================================

  const companyLogos = {
    Google:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",

    Microsoft:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",

    Amazon:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",

    TCS:
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",

    Capgemini:
      "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg",

    Godrej:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Godrej_Logo.svg",
  };

  const logo = companyLogos[companyName];

  // ==========================================
  // COMPANY INITIAL
  // ==========================================

  const companyInitial =
    companyName.charAt(0).toUpperCase();

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="profile-container">

      {/* ======================================
          BACK BUTTON
      ====================================== */}

      <Link
        to="/jobs"
        className="company-back-btn"
      >
        <FaArrowLeft />
        Back to Jobs
      </Link>

      {/* ======================================
          COMPANY CARD
      ====================================== */}

      <div className="profile-card">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="company-header">

          <div className="company-logo-box">

            {logo ? (
              <img
                src={logo}
                alt={`${companyName} logo`}
                className="company-logo"
              />
            ) : (
              <div className="company-logo-placeholder">
                {companyInitial}
              </div>
            )}

          </div>

          <h1>{companyName}</h1>

          <p className="company-subtitle">
            <FaBuilding />
            Hiring on JobPortal
          </p>

          <p className="rating">
            <FaStar />
            Trusted Company
          </p>

        </div>

        {/* ====================================
            COMPANY INFO
        ==================================== */}

        <div className="profile-info">

          <div className="info-item">

            <FaMapMarkerAlt />

            <div>
              <span className="info-label">
                Locations
              </span>

              <strong>
                {locations.join(", ")}
              </strong>
            </div>

          </div>

          <div className="info-item">

            <FaBriefcase />

            <div>
              <span className="info-label">
                Open Positions
              </span>

              <strong>
                {companyJobs.length} Jobs
              </strong>
            </div>

          </div>

          <div className="info-item">

            <FaUsers />

            <div>
              <span className="info-label">
                Hiring
              </span>

              <strong>
                Actively Hiring
              </strong>
            </div>

          </div>

          <div className="info-item">

            <FaGlobe />

            <div>
              <span className="info-label">
                Work Type
              </span>

              <strong>
                {jobTypes.join(", ")}
              </strong>
            </div>

          </div>

        </div>

        {/* ====================================
            ABOUT COMPANY
        ==================================== */}

        <div className="about">

          <h2>
            About {companyName}
          </h2>

          <p>
            {companyName} is currently hiring
            professionals for multiple roles listed
            on JobPortal. Explore the available
            opportunities below and find a position
            that matches your skills and experience.
          </p>

        </div>

        {/* ====================================
            OPEN POSITIONS
        ==================================== */}

        <div className="open-jobs">

          <h2>
            Open Positions
          </h2>

          <div className="company-jobs-list">

            {companyJobs.map((job) => (

              <div
                className="company-job-card"
                key={job._id || job.id}
              >

                <div className="company-job-info">

                  <h3>
                    {job.title}
                  </h3>

                  <div className="company-job-meta">

                    <span>
                      <FaMapMarkerAlt />
                      {job.location}
                    </span>

                    <span>
                      <FaBriefcase />
                      {job.jobType}
                    </span>

                    <span>
                      💰 {job.salary}
                    </span>

                  </div>

                </div>

                <Link
                  to={`/jobs/${job._id || job.id}`}
                  className="company-view-job-btn"
                >
                  View Job
                </Link>

              </div>

            ))}

          </div>

        </div>

        {/* ====================================
            WEBSITE
        ==================================== */}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="visit-btn"
          >
            <FaGlobe />
            Visit Company Website
          </a>
        )}

      </div>

    </div>
  );
}

export default Profiles;