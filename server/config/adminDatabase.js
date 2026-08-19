const mongoose = require("mongoose");

const adminConnection = mongoose.createConnection(
  process.env.ADMIN_MONGO_URI,
  {
    serverSelectionTimeoutMS: 10000,
  }
);

adminConnection.on("connected", () => {
  console.log("✅ Admin MongoDB Connected Successfully");
});

adminConnection.on("error", (error) => {
  console.log("❌ Admin MongoDB Connection Failed");
  console.log(error.message);
});

module.exports = adminConnection;