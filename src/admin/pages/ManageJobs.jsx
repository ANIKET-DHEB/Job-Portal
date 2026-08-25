import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../../styles/Admin.css";

function ManageJobs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyFilter = searchParams.get("company");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);

    axios
      .get("https://job-portal-backend-qlnk.onrender.com/api/jobs")
      .then((res) => {
        setJobs(res.data.jobs || []);
      })
      .catch((err) => {
        console.log("FETCH ADMIN JOBS ERROR:", err);
        setJobs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://job-portal-backend-qlnk.onrender.com/api/jobs/${id}`
      );

      alert("Job Deleted Successfully");
      fetchJobs();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const companies = [
    ...new Set(
      jobs.map((job) => job.company).filter(Boolean)
    ),
  ];

  const locations = [
    ...new Set(
      jobs.map((job) => job.location).filter(Boolean)
    ),
  ];

  const jobTypes = [
    ...new Set(
      jobs.map((job) => job.jobType).filter(Boolean)
    ),
  ];

  const filteredJobs = jobs.filter((job) => {
    const searchText =
      `${job.title || ""} ${job.company || ""} ${job.location || ""} ${job.jobType || ""}`.toLowerCase();

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    );

    const matchesUrlCompany = companyFilter
      ? job.company?.toLowerCase() ===
        companyFilter.toLowerCase()
      : true;

    const matchesCompany = selectedCompany
      ? job.company === selectedCompany
      : true;

    const matchesLocation = selectedLocation
      ? job.location === selectedLocation
      : true;

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

  const clearFilters = () => {
    setSearch("");
    setSelectedCompany("");
    setSelectedLocation("");
    setSelectedJobType("");
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminNavbar />

        <div className="recent-section manage-jobs-section">

          <div className="manage-page-header">
            <div>
              <h2>
                {companyFilter
                  ? `${companyFilter} Jobs`
                  : "Manage Jobs"}
              </h2>

              <p>
                {companyFilter
                  ? `Jobs posted by ${companyFilter}`
                  : "Manage all jobs posted on the portal"}
              </p>
            </div>

            <button
              className="clear-btn add-job-btn"
              onClick={() =>
                navigate("/admin/jobs/add")
              }
            >
              + Add New Job
            </button>
          </div>

          {companyFilter && (
            <div className="company-filter-box">
              <div>
                <strong>Company:</strong>{" "}
                {companyFilter}

                <span>
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

          <input
            type="text"
            className="admin-search-input"
            placeholder="Search by job, company, location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="jobs-filter-grid">

            <select
              value={selectedCompany}
              onChange={(e) =>
                setSelectedCompany(e.target.value)
              }
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

            <select
              value={selectedLocation}
              onChange={(e) =>
                setSelectedLocation(e.target.value)
              }
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

            <select
              value={selectedJobType}
              onChange={(e) =>
                setSelectedJobType(e.target.value)
              }
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

            <button
              className="clear-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

          <div className="jobs-result-count">
            {loading ? (
              "Loading jobs..."
            ) : (
              <>
                Showing{" "}
                <strong>
                  {filteredJobs.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {jobs.length}
                </strong>{" "}
                jobs
              </>
            )}
          </div>

          <div className="admin-table-container">

            <table className="admin-data-table jobs-data-table">

              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Job Type</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td colSpan="5">
                      <h3>
                        ⏳ Loading Jobs...
                      </h3>

                      <p>
                        Please wait while jobs are loading.
                      </p>
                    </td>
                  </tr>

                ) : filteredJobs.length > 0 ? (

                  filteredJobs.map((job) => (

                    <tr key={job._id}>

                      <td data-label="Job Title">
                        <span className="mobile-table-value">
                          <strong>
                            {job.title}
                          </strong>
                        </span>
                      </td>

                      <td data-label="Company">
                        <span className="mobile-table-value">
                          {job.company}
                        </span>
                      </td>

                      <td data-label="Location">
                        <span className="mobile-table-value">
                          {job.location}
                        </span>
                      </td>

                      <td data-label="Job Type">
                        <span className="mobile-table-value">
                          {job.jobType || "N/A"}
                        </span>
                      </td>

                      <td data-label="Actions">

                        <div className="mobile-action-buttons">

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
                            onClick={() =>
                              deleteJob(job._id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="5">
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