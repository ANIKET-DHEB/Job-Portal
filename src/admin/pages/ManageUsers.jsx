import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/Admin.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Users
  // ==========================

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://job-portal-backend-qlnk.onrender.com/api/auth/users"
      );

      setUsers(res.data.users || []);
    } catch (error) {
      console.log("FETCH USERS ERROR:", error);

      setUsers([]);

      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Delete User
  // ==========================

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://job-portal-backend-qlnk.onrender.com/api/auth/users/${id}`
      );

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (error) {
      console.log(
        "DELETE USER ERROR:",
        error
      );

      alert("Failed to delete user");
    }
  };

  // ==========================
  // Search Users
  // ==========================

  const filteredUsers = users.filter((user) =>
    `${user.name || ""} ${user.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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

        <div className="recent-section manage-users-section">

          {/* ==========================
              HEADER
          ========================== */}

          <div className="manage-page-header">

            <div>

              <h2>
                Manage Users
              </h2>

              <p>
                {loading
                  ? "Loading users..."
                  : `Total Users: ${users.length}`}
              </p>

            </div>

          </div>

          {/* ==========================
              SEARCH
          ========================== */}

          <input
            type="text"
            className="admin-search-input"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* ==========================
              USERS TABLE
          ========================== */}

          <div className="admin-table-container">

            <table className="admin-data-table">

              <thead>

                <tr>

                  <th>
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Role
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

                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                      }}
                    >

                      <h3>
                        ⏳ Loading Users...
                      </h3>

                      <p
                        style={{
                          marginTop: "8px",
                          color: "#64748b",
                        }}
                      >
                        Please wait while users are loading.
                      </p>

                    </td>

                  </tr>

                ) : filteredUsers.length > 0 ? (

                  /* ==========================
                     USERS
                  ========================== */

                  filteredUsers.map((user) => (

                    <tr
                      key={user._id}
                    >

                      {/* NAME */}

                      <td data-label="Name">

                        <span className="mobile-table-value">
                          {user.name || "N/A"}
                        </span>

                      </td>

                      {/* EMAIL */}

                      <td data-label="Email">

                        <span className="mobile-table-value">
                          {user.email || "N/A"}
                        </span>

                      </td>

                      {/* ROLE */}

                      <td data-label="Role">

                        <span
                          className="user-role-badge"
                        >
                          User
                        </span>

                      </td>

                      {/* ACTION */}

                      <td data-label="Action">

                        <div className="mobile-action-buttons">

                          <button
                            className="apply-btn"
                            onClick={() =>
                              deleteUser(
                                user._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  /* ==========================
                     NO USERS
                  ========================== */

                  <tr>

                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No Users Found
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

export default ManageUsers;