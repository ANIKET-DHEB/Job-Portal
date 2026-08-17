import { createContext, useState } from "react";

export const SavedJobsContext = createContext();

function SavedJobsProvider({ children }) {
  const [savedJobs, setSavedJobs] = useState([]);

  function saveJob(job) {
    const alreadySaved = savedJobs.find((item) => item.id === job.id);

    if (alreadySaved) {
      setSavedJobs(savedJobs.filter((item) => item.id !== job.id));
    } else {
      setSavedJobs([...savedJobs, job]);
    }
  }

  return (
    <SavedJobsContext.Provider
      value={{
        savedJobs,
        saveJob,
      }}
    >
      {children}
    </SavedJobsContext.Provider>
  );
}

export default SavedJobsProvider;