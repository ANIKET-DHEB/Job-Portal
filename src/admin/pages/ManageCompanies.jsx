import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/Admin.css";

function ManageCompanies() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://job-portal-backend-qlnk.onrender.com/api/jobs"
      );

      console.log(
        "COMPANIES JOB DATA:",
        res.data.jobs
      );

      setJobs(res.data.jobs || []);

    } catch (error) {
      console.log(
        "FETCH COMPANIES ERROR:",
        error
      );

      setJobs([]);

      alert("Failed to load companies");

    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Create Company List
  // ==========================

  const companies = [];

  jobs.forEach((job) => {
    const companyName = String(
      job.company || ""
    ).trim();

    if (!companyName) return;

    const existingCompany = companies.find(
      (company) =>
        company.name.toLowerCase() ===
        companyName.toLowerCase()
    );

    if (existingCompany) {

      existingCompany.jobs += 1;

      const jobLocation = String(
        job.location || ""
      ).trim();

      if (
        jobLocation &&
        !existingCompany.locations.includes(
          jobLocation
        )
      ) {
        existingCompany.locations.push(
          jobLocation
        );
      }

    } else {

      const jobLocation = String(
        job.location || ""
      ).trim();

      companies.push({
        name: companyName,
        jobs: 1,
        locations: jobLocation
          ? [jobLocation]
          : [],
      });
    }
  });

  // ==========================
  // Search Companies
  // ==========================

  const filteredCompanies =
    companies.filter((company) => {

      const companyText = String(
        company.name || ""
      ).toLowerCase();

      const locationText = (
        company.locations || []
      )
        .map((location) =>
          String(location || "")
        )
        .join(" ")
        .toLowerCase();

      const searchText = String(
        search || ""
      ).toLowerCase();

      return `${companyText} ${locationText}`.includes(
        searchText
      );
    });

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

        <div className="recent-section manage-companies-section">

          {/* ==========================
              HEADER
          ========================== */}

          <div className="manage-page-header">

            <div>

              <h2>
                Manage Companies
              </h2>

              <p>
                {loading
                  ? "Loading companies..."
                  : `Total Companies: ${companies.length}`}
              </p>

            </div>

          </div>

          {/* ==========================
              SEARCH
          ========================== */}

          <input
            type="text"
            className="admin-search-input"
            placeholder="Search company or location..."
            value={String(search || "")}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* ==========================
              COMPANY TABLE
          ========================== */}

          <div className="admin-table-container">

            <table className="admin-data-table companies-data-table">

              <thead>

                <tr>

                  <th>
                    Company
                  </th>

                  <th>
                    Total Jobs
                  </th>

                  <th>
                    Locations
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {/* ==========================
                    LOADING
                ========================== */}

                {loading ? (

                  <tr>

                    <td colSpan="4">

                      <h3>
                        ⏳ Loading Companies...
                      </h3>

                      <p>
                        Please wait while companies are loading.
                      </p>

                    </td>

                  </tr>

                ) : filteredCompanies.length > 0 ? (

                  /* ==========================
                      COMPANIES
                  ========================== */

                  filteredCompanies.map(
                    (company) => (

                      <tr
                        key={company.name}
                      >

                        {/* Company */}

                        <td data-label="Company">

                          <span className="mobile-table-value">

                            <strong>
                              {company.name}
                            </strong>

                          </span>

                        </td>

                        {/* Total Jobs */}

                        <td data-label="Total Jobs">

                          <span className="mobile-table-value">

                            {company.jobs}

                          </span>

                        </td>

                        {/* Locations */}

                        <td data-label="Locations">

                          <span className="mobile-table-value">

                            {company.locations.length > 0
                              ? company.locations.join(", ")
                              : "N/A"}

                          </span>

                        </td>

                        {/* Action */}

                        <td data-label="Action">

                          <div className="mobile-action-buttons">

                            <button
                              className="dashboard-view-btn"
                              onClick={() =>
                                navigate(
                                  `/admin/jobs?company=${encodeURIComponent(
                                    company.name
                                  )}`
                                )
                              }
                            >
                              View Jobs
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  /* ==========================
                      NO COMPANIES
                  ========================== */

                  <tr>

                    <td colSpan="4">

                      No Companies Found

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

export default ManageCompanies;