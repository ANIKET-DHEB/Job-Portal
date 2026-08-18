const mongoose = require("mongoose");

const adminConnection = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/jobportal_admin",
  {
    serverSelectionTimeoutMS: 10000,
  }
);

adminConnection.on("connected", () => {
  console.log("✅ Admin MongoDB Connected Successfully");
});

adminConnection.on("error", (error) => {
  console.log("❌ Admin MongoDB Connection Failed");
  console.log(error);
});

module.exports = adminConnection;