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

  // ==========================
  // LOADING STATE
  // ==========================

  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Jobs
  // ==========================

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

  // ==========================
  // Render
  // ==========================

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
            }}
          >

            <div>

              <h2>
                Manage Companies
              </h2>

              <p
                style={{
                  marginTop: "5px",
                  color: "#64748b",
                }}
              >
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
            placeholder="Search company or location..."
            value={String(search || "")}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "10px",
              border:
                "1px solid #dbe4f0",
              marginBottom: "20px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* ==========================
              COMPANY TABLE
          ========================== */}

          <div
            style={{
              overflowX: "auto",
            }}
          >

            <table>

              <thead>

                <tr>
                  <th>Company</th>
                  <th>Total Jobs</th>
                  <th>Locations</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {/* ==========================
                    LOADING
                ========================== */}

                {loading ? (

                  <tr>

                    <td
                      colSpan="4"
                      style={{
                        textAlign:
                          "center",
                        padding: "40px",
                      }}
                    >

                      <h3>
                        ⏳ Loading Companies...
                      </h3>

                      <p
                        style={{
                          marginTop: "8px",
                          color: "#64748b",
                        }}
                      >
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

                        <td>

                          <strong>
                            {company.name}
                          </strong>

                        </td>

                        {/* Total Jobs */}

                        <td>
                          {company.jobs}
                        </td>

                        {/* Locations */}

                        <td>

                          {company.locations.length >
                          0
                            ? company.locations.join(
                                ", "
                              )
                            : "N/A"}

                        </td>

                        {/* Action */}

                        <td>

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

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  /* ==========================
                      NO COMPANIES
                  ========================== */

                  <tr>

                    <td
                      colSpan="4"
                      style={{
                        textAlign:
                          "center",
                        padding: "30px",
                      }}
                    >
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