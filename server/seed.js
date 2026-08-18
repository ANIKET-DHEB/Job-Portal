const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Job = require("./models/job");
const jobs = require("./data/jobs");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Delete old jobs
    await Job.deleteMany();
    console.log("🗑️ Old jobs deleted");

    // Insert new jobs
    try {
  const result = await Job.insertMany(jobs);
  console.log(`✅ Inserted ${result.length} jobs`);
} catch (err) {
  console.log("❌ Insert Error:");
  console.log(err);
}
    console.log("🎉 Sample jobs inserted successfully");

    process.exit(); 
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });