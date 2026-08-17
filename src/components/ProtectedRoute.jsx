import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // ==========================
  // Check NORMAL USER Login
  // ==========================
  const userToken = localStorage.getItem("userToken");

  // ==========================
  // If User is NOT Logged In
  // ==========================
  if (!userToken) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ==========================
  // User is Logged In
  // ==========================
  return children;
}

export default ProtectedRoute;