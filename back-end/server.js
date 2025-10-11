require("dotenv").config(); // Load .env first
const app = require("./src/app");

// ✅ Validate and parse PORT
const PORT = Number(process.env.PORT) || 5000;

if (isNaN(PORT)) {
  console.error("❌ Error: PORT environment variable is not a valid number.");
  process.exit(1);
}

app.get('/api', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});


// ✅ Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log("========================================");
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🚀 Server is running on port: ${PORT}`);
  console.log("========================================");
});


// ✅ Graceful Shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);

  server.close(() => {
    console.log("✅ HTTP server closed.");
    // Example: if you have a DB connection module
    if (typeof global.dbDisconnect === "function") {
      global.dbDisconnect();
    }
    console.log("💤 Cleanup complete. Exiting now...");
    process.exit(0);
  });

  // Force exit after 10 seconds if cleanup hangs
  setTimeout(() => {
    console.error("⏳ Forced shutdown: Cleanup did not complete in time.");
    process.exit(1);
  }, 10 * 1000);
};

// ✅ Handle termination signals
["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});

// ✅ Optional: Handle uncaught exceptions & rejections
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("⚠️ Unhandled Rejection:", reason);
  process.exit(1);
});
