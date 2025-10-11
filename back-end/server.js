require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1); // Exit if DB fails
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',   // frontend origin
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Handle preflight OPTIONS for all routes
app.options('*', cors());

// Example health check route
app.get('/api', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Mount your API routes here
// const router = require('./routes/sellAndBuyRoutes');
// app.use('/api', router);

// Start server (listen on all interfaces for WSL/Windows)
app.listen(PORT, '0.0.0.0', () => {
  console.log("========================================");
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🚀 Server is running on port: ${PORT}`);
  console.log("========================================");
});
