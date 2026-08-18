import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "../../styles/Admin.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ==========================
  // Fetch Users
  // ==========================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/users"
      );

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
      alert("Failed to load users");
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
        `http://localhost:5000/api/auth/users/${id}`
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
    `${user.name} ${user.email}`
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

          {/* Header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2>Manage Users</h2>

              <p
                style={{
                  marginTop: "5px",
                  color: "#64748b",
                }}
              >
                Total Users: {users.length}
              </p>
            </div>
          </div>

          {/* Search */}

          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

          {/* Users Table */}

          <div style={{ overflowX: "auto" }}>

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

                {filteredUsers.map((user) => (
                  <tr key={user._id}>

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
                          deleteUser(user._id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

                {/* No Users */}

                {filteredUsers.length === 0 && (
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

