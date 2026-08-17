import "../styles/Dashboard.css";

function RecentApplication({ title, company, status }) {
  return (
    <div className="application-card">
      <div>
        <h3>{title}</h3>
        <p>{company}</p>
      </div>

      <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
        {status}
      </span>
    </div>
  );
}

export default RecentApplication;