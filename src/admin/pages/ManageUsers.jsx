import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/Admin.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ==========================
  // LOADING STATE
  // ==========================

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
      console.log(error);

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
                Manage Users
              </h2>

              <p
                style={{
                  marginTop: "5px",
                  color: "#64748b",
                }}
              >
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
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "10px",
              border: "1px solid #dbe4f0",
              marginBottom: "20px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* ==========================
              USERS TABLE
          ========================== */}

          <div
            style={{
              overflowX: "auto",
            }}
          >

            <table>

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
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

                      <td>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>

                        <span
                          style={{
                            background: "#dbeafe",
                            color: "#1d4ed8",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          User
                        </span>

                      </td>

                      <td>

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