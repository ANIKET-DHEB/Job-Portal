import "../../styles/Admin.css";

function AdminNavbar() {
  return (
    <div className="admin-navbar">
      <div>
        <h2>Dashboard</h2>
        <p>Welcome back, Admin 👋</p>
      </div>

      <div className="admin-user">
        <img
          src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"
          alt="Admin"
        />
      </div>
    </div>
  );
}

export default AdminNavbar;