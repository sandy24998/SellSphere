const app = require('./app');

const PORT = process.env.PORT || 5000;

// Start server listening on all interfaces (0.0.0.0 works with WSL/PM2)
app.listen(PORT, '0.0.0.0', () => {
  console.log("========================================");
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🚀 Server is running on port: ${PORT}`);
  console.log("========================================");
});
