const mongoose = require("mongoose");
require("dotenv").config();

const Job = require("../models/Job");

const getJobDetails = (title) => {
  const jobTitle = title.toLowerCase();

  const benefits = [
    "Competitive salary package",
    "Flexible working hours",
    "Learning and development opportunities",
    "Professional growth opportunities",
    "Supportive work environment",
  ];

  if (jobTitle.includes("react")) {
    return {
      responsibilities: [
        "Develop responsive web applications using React.js",
        "Build reusable and maintainable React components",
        "Integrate REST APIs with frontend applications",
        "Optimize application performance and user experience",
        "Collaborate with designers and backend developers",
        "Debug and resolve application issues",
      ],
      benefits,
    };
  }

  if (jobTitle.includes("node")) {
    return {
      responsibilities: [
        "Develop scalable backend services using Node.js",
        "Build and maintain RESTful APIs",
        "Integrate backend services with databases",
        "Implement secure authentication and authorization",
        "Optimize server-side application performance",
        "Debug and resolve backend issues",
      ],
      benefits,
    };
  }

  if (jobTitle.includes("backend")) {
    return {
      responsibilities: [
        "Design and develop scalable backend applications",
        "Build and maintain secure REST APIs",
        "Design and manage database structures",
        "Implement authentication and authorization",
        "Optimize backend performance and reliability",
        "Collaborate with frontend developers and technical teams",
      ],
      benefits,
    };
  }

  if (jobTitle.includes("frontend")) {
    return {
      responsibilities: [
        "Develop responsive and user-friendly web applications",
        "Build reusable frontend components",
        "Integrate frontend applications with REST APIs",
        "Implement responsive designs across devices",
        "Optimize website performance and accessibility",
        "Collaborate with designers and backend developers",
      ],
      benefits,
    };
  }

  if (jobTitle.includes("full stack") || jobTitle.includes("fullstack")) {
    return {
      responsibilities: [
        "Develop and maintain full-stack web applications",
        "Build responsive frontend interfaces",
        "Develop and integrate REST APIs",
        "Work with databases and backend services",
        "Debug and optimize application performance",
        "Collaborate with cross-functional development teams",
      ],
      benefits,
    };
  }

  if (jobTitle.includes("flutter")) {
    return {
      responsibilities: [
        "Develop cross-platform mobile applications using Flutter",
        "Build reusable Flutter widgets and components",
        "Integrate mobile applications with REST APIs",
        "Implement responsive and user-friendly mobile interfaces",
        "Debug and optimize application performance",
        "Collaborate with UI/UX and backend development teams",
      ],
      benefits,
    };
  }

  if (jobTitle.includes("java")) {
    return {
      responsibilities: [
        "Develop and maintain Java-based applications",
        "Write clean and maintainable Java code",
        "Develop and integrate backend services and APIs",
        "Work with databases and application components",
        "Debug and resolve software issues",
        "Collaborate with development and testing teams",
      ],
      benefits,
    };
  }

  if (jobTitle.includes("php")) {
    return {
      responsibilities: [
        "Develop and maintain web applications using PHP",
        "Build and integrate backend APIs",
        "Work with MySQL and other database systems",
        "Implement secure and scalable application features",
        "Debug and resolve application issues",
        "Collaborate with frontend and backend development teams",
      ],
      benefits,
    };
  }

  return {
    responsibilities: [
      "Develop and maintain high-quality software applications",
      "Implement new features according to business requirements",
      "Test, debug and optimize application functionality",
      "Integrate APIs and external services when required",
      "Maintain clean and maintainable code",
      "Collaborate with cross-functional teams",
    ],
    benefits,
  };
};

const updateJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const jobs = await Job.find();

    console.log(`Found ${jobs.length} jobs`);

    for (const job of jobs) {
      const details = getJobDetails(job.title);

      await Job.findByIdAndUpdate(job._id, {
        responsibilities: details.responsibilities,
        benefits: details.benefits,
      });

      console.log(`Updated: ${job.title}`);
    }

    console.log("=================================");
    console.log("All jobs updated successfully!");
    console.log(`Total jobs updated: ${jobs.length}`);
    console.log("=================================");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error updating jobs:", error);
    await mongoose.connection.close();
  }
};

updateJobs();