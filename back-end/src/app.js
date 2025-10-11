const express = require("express");
const cors = require("cors");
const router = require('./routes/sellAndBuyRoutes');
const connectDB = require('./config/db');

require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

// JSON & URL-encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global CORS middleware for frontend
app.use(cors({
  origin: 'http://localhost:3000', // your React app origin
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Handle OPTIONS preflight for all /api routes
app.options('/api/*', cors());

// Mount API routes
app.use('/api', router);

// Catch all for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
