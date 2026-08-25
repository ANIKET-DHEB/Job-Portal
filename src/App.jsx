import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import DownloadApp from "./pages/DownloadApp";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ApplyJob from "./pages/ApplyJob";
import Dashboard from "./pages/Dashboard";
import SavedJobs from "./pages/SavedJobs";
import Profiles from "./pages/Profiles";
import UserProfile from "./pages/UserProfile";
import MyApplications from "./pages/MyApplications";
import JobDetails from "./pages/JobDetails";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";

import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

// ==========================
// Admin
// ==========================

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageJobs from "./admin/pages/ManageJobs";
import ManageUsers from "./admin/pages/ManageUsers";
import ManageApplications from "./admin/pages/ManageApplications";
import ManageCompanies from "./admin/pages/ManageCompanies";
import EditJob from "./admin/pages/EditJob";
import AddJob from "./admin/pages/AddJob";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import AdminSettings from "./admin/pages/AdminSettings";
import ApplicationDetails from "./admin/pages/ApplicationDetails";

function App() {
  const location = useLocation();

  // Hide website Navbar/Footer on admin pages
  const isAdminPage =
    location.pathname.startsWith("/admin");

  // Hide website Navbar/Footer on download page
  const isDownloadPage =
    location.pathname === "/download";

  return (
    <>
      {/* ==========================
          WEBSITE NAVBAR
      ========================== */}

      {!isAdminPage && !isDownloadPage && (
        <Navbar />
      )}

      {/* ==========================
          SCROLL TO TOP
          Works for entire website
      ========================== */}

      <ScrollToTop />

      <Routes>

        {/* ==========================
            HOME
        ========================== */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ==========================
            DOWNLOAD APP
        ========================== */}

        <Route
          path="/download"
          element={<DownloadApp />}
        />

        {/* ==========================
            JOBS
        ========================== */}

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        {/* Dynamic Job Details
            Works for ALL jobs */}

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        {/* ==========================
            AUTH
        ========================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ==========================
            USER DASHBOARD
        ========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            APPLY JOB
        ========================== */}

        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute>
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            SAVED JOBS
        ========================== */}

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            MY APPLICATIONS
        ========================== */}

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            USER PROFILE
        ========================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            COMPANY PROFILE
        ========================== */}

        <Route
          path="/company/:name"
          element={<Profiles />}
        />

        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* ==================================================
            ADMIN DASHBOARD
        ================================================== */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            MANAGE JOBS
        ================================================== */}

        <Route
          path="/admin/jobs"
          element={
            <AdminProtectedRoute>
              <ManageJobs />
            </AdminProtectedRoute>
          }
        />

        {/* ==========================
            ADD JOB
        ========================== */}

        <Route
          path="/admin/jobs/add"
          element={
            <AdminProtectedRoute>
              <AddJob />
            </AdminProtectedRoute>
          }
        />

        {/* ==========================
            EDIT JOB
        ========================== */}

        <Route
          path="/admin/jobs/edit/:id"
          element={
            <AdminProtectedRoute>
              <EditJob />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            MANAGE USERS
        ================================================== */}

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <ManageUsers />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            MANAGE APPLICATIONS
        ================================================== */}

        <Route
          path="/admin/applications"
          element={
            <AdminProtectedRoute>
              <ManageApplications />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            APPLICATION DETAILS
        ================================================== */}

        <Route
          path="/admin/applications/:id"
          element={
            <AdminProtectedRoute>
              <ApplicationDetails />
            </AdminProtectedRoute>
          }
        />

        {/* ==================================================
            MANAGE COMPANIES
        ================================================== */}

        <Route
          path="/admin/companies"
          element={
            <AdminProtectedRoute>
              <ManageCompanies />
            </AdminProtectedRoute>
          }
        />

        {/* ==========================
            STATIC PAGES
        ========================== */}

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        {/* ==================================================
            ADMIN SETTINGS
        ================================================== */}

        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminSettings />
            </AdminProtectedRoute>
          }
        />

      </Routes>

      {/* ==========================
          WEBSITE FOOTER
      ========================== */}

      {!isAdminPage && !isDownloadPage && (
        <Footer />
      )}
    </>
  );
}

export default App;