import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  // ==========================
  // Get Admin Token
  // ==========================
  const adminToken =
    localStorage.getItem("adminToken");

  // ==========================
  // Get Admin Flag
  // ==========================
  const isAdmin =
    localStorage.getItem("admin");

  // ==========================
  // Check Admin Login
  // ==========================
  if (
    !adminToken ||
    isAdmin !== "true"
  ) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  // ==========================
  // Admin Logged In
  // ==========================
  return children;
}

export default AdminProtectedRoute;