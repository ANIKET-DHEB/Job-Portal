import { useState } from "react";
import "../styles/Home.css";
import JobCard from "../components/JobCard";

function Home() {
  const [search, setSearch] = useState("");

  const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Mumbai",
    salary: "₹8 LPA",
    type: "Full Time",
    route: "/frontend",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "Microsoft",
    location: "Bangalore",
    salary: "₹25,000/month",
    type: "Internship",
    route: "/backend",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Hyderabad",
    salary: "₹12 LPA",
    type: "Remote",
    route: "/fullstack",
  },
  {
    id: 4,
    title: "Java Developer Intern",
    company: "TCS",
    location: "Pune",
    salary: "₹15,000/month",
    type: "Internship",
    route: "/java",
  },
  {
    id: 5,
    title: "Flutter Developer",
    company: "Godrej",
    location: "Mumbai",
    salary: "₹12 LPA",
    type: "Hybrid",
    route: "/flutter",
  },
  {
    id: 6,
    title: "PHP Developer",
    company: "Capgemini",
    location: "Pune",
    salary: "₹12 LPA",
    type: "Remote",
    route: "/php",
  },
];
  // Filter jobs based on search
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Job Today</h1>

          <p>
            Search thousands of jobs from top companies and apply with one click.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search for jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>Search</button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="featured-jobs">
        <h2>🔥 Featured Jobs</h2>

        <div className="job-container">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
            key={job.id}
           title={job.title}
            company={job.company}
          location={job.location}
         salary={job.salary}
         type={job.type}
          route={job.route}
        />
            ))
          ) : (
            <h3>No jobs found 😔</h3>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;