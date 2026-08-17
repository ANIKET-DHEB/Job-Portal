import { useContext } from "react";
import { SavedJobsContext } from "../context/SavedJobsContext";
import JobCard from "../components/JobCard";
import "../styles/SavedJobs.css";

function SavedJobs() {
  const { savedJobs } = useContext(SavedJobsContext);

  return (
    <div className="saved-container">

      <h1>❤️ Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        <div className="saved-grid">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              type={job.type}
              route={job.route}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default SavedJobs;