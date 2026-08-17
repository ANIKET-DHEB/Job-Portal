import "../styles/Dashboard.css";

function DashboardCard({ title, count, icon }) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-icon">{icon}</div>

      <h3>{count}</h3>

      <p>{title}</p>
    </div>
  );
}

export default DashboardCard;