import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import JobCard from "../components/JobCard";

function Home() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // Fetch Featured Jobs
  // ==========================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://job-portal-backend-qlnk.onrender.com/api/jobs"
        );

        setJobs(response.data.jobs?.slice(0, 8) || []);
      } catch (error) {
        console.log("HOME JOB ERROR:", error);

        setError(
          "Unable to load jobs right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ==========================
  // Search Filter
  // ==========================
  const filteredJobs = jobs.filter((job) =>
    job.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================
  // Search Button
  // ==========================
  const handleSearch = () => {
    const jobsSection =
      document.querySelector(".featured-jobs");

    if (jobsSection) {
      jobsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="home-page">

      {/* ==========================
          HERO SECTION
      ========================== */}
      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            🚀 Find your next opportunity
          </span>

          <h1>
            Find Your
            <span> Dream Job </span>
            Today
          </h1>

          <p>
            Discover exciting opportunities from top
            companies and take the next step in your career.
          </p>

          {/* Search */}
          <div className="search-box">

            <div className="search-input-wrapper">

              <span className="search-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search for jobs..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

            </div>

            <button
              type="button"
              onClick={handleSearch}
            >
              Search Jobs
            </button>

          </div>

          <div className="hero-stats">

            <div className="hero-stat">
              <strong>100+</strong>
              <span>Job Opportunities</span>
            </div>

            <div className="hero-divider"></div>

            <div className="hero-stat">
              <strong>50+</strong>
              <span>Companies</span>
            </div>

            <div className="hero-divider"></div>

            <div className="hero-stat">
              <strong>24/7</strong>
              <span>Career Access</span>
            </div>

          </div>

        </div>

      </section>

      {/* ==========================
          FEATURED JOBS
      ========================== */}
      <section className="featured-jobs">

        <div className="featured-header">

          <div>

            <span className="section-label">
              OPPORTUNITIES
            </span>

            <h2>
              Featured Jobs
            </h2>

            <p>
              Explore some of the latest opportunities
              available on our platform.
            </p>

          </div>

          <div className="job-count">
            {filteredJobs.length} Jobs
          </div>

        </div>

        {/* ==========================
            LOADING
        ========================== */}
        {loading && (
          <div className="home-state">
            <div className="loader"></div>
            <p>Loading latest jobs...</p>
          </div>
        )}

        {/* ==========================
            ERROR
        ========================== */}
        {!loading && error && (
          <div className="home-state error-state">
            <div className="state-icon">⚠️</div>

            <h3>
              Something went wrong
            </h3>

            <p>{error}</p>
          </div>
        )}

        {/* ==========================
            JOBS
        ========================== */}
        {!loading &&
          !error &&
          filteredJobs.length > 0 && (

            <div className="job-container">

              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  id={job._id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  salary={job.salary}
                  type={job.jobType}
                  route={`/job/${job._id}`}
                />
              ))}

            </div>
          )}

        {/* ==========================
            NO JOBS
        ========================== */}
        {!loading &&
          !error &&
          filteredJobs.length === 0 && (

            <div className="home-state">

              <div className="state-icon">
                🔎
              </div>

              <h3>
                No jobs found
              </h3>

              <p>
                Try searching for a different job title.
              </p>

              <button
                className="clear-search-btn"
                onClick={() => setSearch("")}
              >
                Clear Search
              </button>

            </div>
          )}

      </section>

    </div>
  );
}

export default Home;

