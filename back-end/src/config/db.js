const mongoose = require("mongoose");
const path = require("path");

// Load env variables only in development
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
}

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected to:", conn.connection.db.databaseName);
    return conn;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;