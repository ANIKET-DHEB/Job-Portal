import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/Admin.css";

function ManageJobs() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  // Company filter coming from Manage Companies
  const companyFilter = searchParams.get("company");

  const [jobs, setJobs] = useState([]);

  // Search
  const [search, setSearch] = useState("");

  // Advanced filters
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  // ==========================
  // Fetch Jobs
  // ==========================

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => {
        setJobs(res.data.jobs || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ==========================
  // Delete Job
  // ==========================

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`
      );

      alert("Job Deleted Successfully");

      fetchJobs();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  // ==========================
  // Get Unique Companies
  // ==========================

  const companies = [
    ...new Set(
      jobs
        .map((job) => job.company)
        .filter(Boolean)
    ),
  ];

  // ==========================
  // Get Unique Locations
  // ==========================

  const locations = [
    ...new Set(
      jobs
        .map((job) => job.location)
        .filter(Boolean)
    ),
  ];

  // ==========================
  // Get Unique Job Types
  // ==========================

  const jobTypes = [
    ...new Set(
      jobs
        .map((job) => job.jobType)
        .filter(Boolean)
    ),
  ];

  // ==========================
  // Filter Jobs
  // ==========================

  const filteredJobs = jobs.filter((job) => {
    // Search
    const searchText =
      `${job.title || ""} ${job.company || ""} ${
        job.location || ""
      } ${job.jobType || ""}`.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    // URL Company Filter
    const matchesUrlCompany = companyFilter
      ? job.company?.toLowerCase() ===
        companyFilter.toLowerCase()
      : true;

    // Dropdown Company Filter
    const matchesCompany = selectedCompany
      ? job.company === selectedCompany
      : true;

    // Location Filter
    const matchesLocation = selectedLocation
      ? job.location === selectedLocation
      : true;

    // Job Type Filter
    const matchesJobType = selectedJobType
      ? job.jobType === selectedJobType
      : true;

    return (
      matchesSearch &&
      matchesUrlCompany &&
      matchesCompany &&
      matchesLocation &&
      matchesJobType
    );
  });

  // ==========================
  // Clear Filters
  // ==========================

  const clearFilters = () => {
    setSearch("");
    setSelectedCompany("");
    setSelectedLocation("");
    setSelectedJobType("");
  };

  return (
    <div className="admin-layout">

      {/* ==========================
          SIDEBAR
      ========================== */}

      <AdminSidebar />

      {/* ==========================
          CONTENT
      ========================== */}

      <div className="admin-content">

        <AdminNavbar />

        <div className="recent-section">

          {/* ==========================
              HEADER
          ========================== */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              gap: "20px",
            }}
          >

            <div>

              <h2>
                {companyFilter
                  ? `${companyFilter} Jobs`
                  : "Manage Jobs"}
              </h2>

              <p
                style={{
                  marginTop: "5px",
                  color: "#64748b",
                }}
              >
                {companyFilter
                  ? `Jobs posted by ${companyFilter}`
                  : "Manage all jobs posted on the portal"}
              </p>

            </div>

            {/* ADD JOB */}

            <button
              className="clear-btn"
              onClick={() =>
                navigate("/admin/jobs/add")
              }
            >
              + Add New Job
            </button>

          </div>

          {/* ==========================
              COMPANY FILTER INFO
          ========================== */}

          {companyFilter && (

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                padding: "12px 16px",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >

              <div>

                <strong>
                  Company:
                </strong>{" "}

                {companyFilter}

                <span
                  style={{
                    marginLeft: "10px",
                    color: "#64748b",
                  }}
                >
                  ({filteredJobs.length} jobs)
                </span>

              </div>

              <button
                className="dashboard-view-btn"
                onClick={() =>
                  navigate("/admin/jobs")
                }
              >
                View All Jobs
              </button>

            </div>

          )}

          {/* ==========================
              SEARCH
          ========================== */}

          <input
            type="text"
            placeholder="Search by job, company, location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              marginBottom: "15px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* ==========================
              FILTERS
          ========================== */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr) auto",
              gap: "12px",
              marginBottom: "20px",
            }}
          >

            {/* COMPANY */}

            <select
              value={selectedCompany}
              onChange={(e) =>
                setSelectedCompany(e.target.value)
              }
              style={{
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #dbe4f0",
                fontSize: "14px",
                background: "#fff",
              }}
            >

              <option value="">
                All Companies
              </option>

              {companies.map((company) => (
                <option
                  key={company}
                  value={company}
                >
                  {company}
                </option>
              ))}

            </select>

            {/* LOCATION */}

            <select
              value={selectedLocation}
              onChange={(e) =>
                setSelectedLocation(e.target.value)
              }
              style={{
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #dbe4f0",
                fontSize: "14px",
                background: "#fff",
              }}
            >

              <option value="">
                All Locations
              </option>

              {locations.map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}

            </select>

            {/* JOB TYPE */}

            <select
              value={selectedJobType}
              onChange={(e) =>
                setSelectedJobType(e.target.value)
              }
              style={{
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #dbe4f0",
                fontSize: "14px",
                background: "#fff",
              }}
            >

              <option value="">
                All Job Types
              </option>

              {jobTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}

            </select>

            {/* CLEAR FILTERS */}

            <button
              className="clear-btn"
              onClick={clearFilters}
              style={{
                whiteSpace: "nowrap",
              }}
            >
              Clear Filters
            </button>

          </div>

          {/* ==========================
              RESULT COUNT
          ========================== */}

          <div
            style={{
              marginBottom: "15px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >

            Showing{" "}
            <strong>
              {filteredJobs.length}
            </strong>{" "}
            of{" "}
            <strong>
              {jobs.length}
            </strong>{" "}
            jobs

          </div>

          {/* ==========================
              JOB TABLE
          ========================== */}

          <div
            style={{
              overflowX: "auto",
            }}
          >

            <table>

              <thead>

                <tr>

                  <th>
                    Job Title
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Job Type
                  </th>

                  <th
                    style={{
                      width: "180px",
                    }}
                  >
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredJobs.length > 0 ? (

                  filteredJobs.map((job) => (

                    <tr
                      key={job._id}
                    >

                      {/* JOB */}

                      <td>
                        <strong>
                          {job.title}
                        </strong>
                      </td>

                      {/* COMPANY */}

                      <td>
                        {job.company}
                      </td>

                      {/* LOCATION */}

                      <td>
                        {job.location}
                      </td>

                      {/* JOB TYPE */}

                      <td>
                        {job.jobType || "N/A"}
                      </td>

                      {/* ACTIONS */}

                      <td>

                        <button
                          className="details-btn"
                          onClick={() =>
                            navigate(
                              `/admin/jobs/edit/${job._id}`
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="apply-btn"
                          style={{
                            marginLeft: "10px",
                          }}
                          onClick={() =>
                            deleteJob(job._id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      {companyFilter
                        ? `No jobs found for ${companyFilter}`
                        : "No Jobs Found"}

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageJobs;