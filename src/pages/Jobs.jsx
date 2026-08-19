import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import "../styles/Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [sortBy, setSortBy] = useState("");

  // ==========================
  // Fetch Jobs
  // ==========================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "https://job-portal-backend-qlnk.onrender.com /api/jobs"
        );

        setJobs(res.data.jobs || []);
      } catch (error) {
        console.log("FETCH JOBS ERROR:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  // ==========================
  // Filter Jobs
  // ==========================
  let filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase().trim();

    const title = String(job.title || "").toLowerCase();
    const company = String(job.company || "").toLowerCase();
    const jobLocation = String(job.location || "").toLowerCase();

    const matchesSearch =
      searchText === "" ||
      title.includes(searchText) ||
      company.includes(searchText) ||
      jobLocation.includes(searchText);

    const matchesLocation =
      location === "" ||
      jobLocation.includes(location.toLowerCase());

    const matchesJobType =
      jobType === "" ||
      String(job.jobType || "").toLowerCase() ===
        jobType.toLowerCase();

    const matchesExperience =
      experience === "" ||
      String(job.experience || "").toLowerCase() ===
        experience.toLowerCase();

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesExperience
    );
  });

  // ==========================
  // Get Salary Number
  // ==========================
  const getSalaryValue = (salary) => {
    if (!salary) return 0;

    const salaryText = String(salary);

    const numbers = salaryText.match(/\d+/g);

    if (!numbers) return 0;

    return Math.max(
      ...numbers.map((number) =>
        Number(number)
      )
    );
  };

  // ==========================
  // Sorting
  // ==========================
  if (sortBy === "az") {
    filteredJobs.sort((a, b) =>
      String(a.title || "").localeCompare(
        String(b.title || "")
      )
    );
  }

  if (sortBy === "latest") {
    filteredJobs.sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );
  }

  if (sortBy === "salary-high") {
    filteredJobs.sort(
      (a, b) =>
        getSalaryValue(b.salary) -
        getSalaryValue(a.salary)
    );
  }

  if (sortBy === "salary-low") {
    filteredJobs.sort(
      (a, b) =>
        getSalaryValue(a.salary) -
        getSalaryValue(b.salary)
    );
  }

  // ==========================
  // Clear Filters
  // ==========================
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setExperience("");
    setSortBy("");
  };

  return (
    <div className="jobs-page">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="jobs-header">

        <h1>
          💼 Find Your Dream Job
        </h1>

        <p>
          Browse{" "}
          <strong>
            {filteredJobs.length}
          </strong>{" "}
          available jobs from top companies.
        </p>

      </div>

      {/* ==========================
          FILTERS
      ========================== */}

      <div className="filters">

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search job, company or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Location */}

        <select
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        >

          <option value="">
            All Locations
          </option>

          <option value="Mumbai">
            Mumbai
          </option>

          <option value="Pune">
            Pune
          </option>

          <option value="Bengaluru">
            Bengaluru
          </option>

          <option value="Hyderabad">
            Hyderabad
          </option>

          <option value="Chennai">
            Chennai
          </option>

        </select>

        {/* Job Type */}

        <select
          value={jobType}
          onChange={(e) =>
            setJobType(e.target.value)
          }
        >

          <option value="">
            All Job Types
          </option>

          <option value="Full Time">
            Full Time
          </option>

          <option value="Internship">
            Internship
          </option>

          <option value="Remote">
            Remote
          </option>

          <option value="Hybrid">
            Hybrid
          </option>

        </select>

        {/* Experience */}

        <select
          value={experience}
          onChange={(e) =>
            setExperience(e.target.value)
          }
        >

          <option value="">
            All Experience
          </option>

          <option value="Fresher">
            Fresher
          </option>

          <option value="0-1 Years">
            0-1 Years
          </option>

          <option value="1-3 Years">
            1-3 Years
          </option>

          <option value="3-5 Years">
            3-5 Years
          </option>

          <option value="5+ Years">
            5+ Years
          </option>

        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="">
            Sort By
          </option>

          <option value="latest">
            Newest First
          </option>

          <option value="salary-high">
            Highest Salary
          </option>

          <option value="salary-low">
            Lowest Salary
          </option>

          <option value="az">
            A-Z
          </option>

        </select>

        {/* Clear */}

        <button
          className="clear-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

      {/* ==========================
          RESULTS
      ========================== */}

      <div className="results">

        <h3>
          💼 {filteredJobs.length} Jobs Found
        </h3>

        <span>
          Showing {filteredJobs.length} of{" "}
          {jobs.length} Jobs
        </span>

      </div>

      {/* ==========================
          JOB CARDS
      ========================== */}

      <div className="job-container">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => (

            <JobCard
              key={job._id}
              id={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              type={job.jobType}
            />

          ))

        ) : (

          <div className="no-jobs">

            <h2>
              😔 No Jobs Found
            </h2>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Jobs;

