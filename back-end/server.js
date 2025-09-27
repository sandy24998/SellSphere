const app = require("./src/app");

const PORT = parseInt(process.env.PORT, 10) || 5000; // Parse PORT as integer

if (isNaN(PORT)) {
  console.error("Error: PORT environment variable is not a valid number.");
  process.exit(1); // Exit with error code
}

const server = app.listen(PORT, () => {
  console.log(`Environment PORT: ${process.env.PORT}`); // clearer log
  console.log(`Server listening on port ${PORT}`);
});

// Graceful Shutdown (Optional)
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

function gracefulShutdown() {
  console.log("Server is shutting down...");
  server.close(() => {
    console.log("Server shutdown complete.");
    process.exit(0);
  });
  // Add any database disconnection or other cleanup here.
  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10 * 1000);
}


// const express = require('express');
// const app = express();
// const router = express.Router();

// router.get('/sellProduct', (req, res) => {
//     console.log("Request received at /api/sellProduct");
//     res.status(200).json({ message: 'Sell product route hit' });
// });

// app.use('/api', router);

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });