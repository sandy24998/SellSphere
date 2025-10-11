const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
};

// 👇 Export disconnect for graceful shutdown
global.dbDisconnect = async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed.");
};

module.exports = connectDB;
