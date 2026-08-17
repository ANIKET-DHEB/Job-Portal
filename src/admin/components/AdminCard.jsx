import "../../styles/Admin.css";

function AdminCard({ title, count, icon }) {
  return (
    <div className="admin-card">
      <div className="card-icon">{icon}</div>

      <div>
        <h2>{count}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default AdminCard;