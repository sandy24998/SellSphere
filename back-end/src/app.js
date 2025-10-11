require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/sellAndBuyRoutes'); // your API routes

const app = express();

// Connect to MongoDB
connectDB();

// JSON & URL-encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Handle preflight OPTIONS
app.options('*', cors());

// Mount API routes
app.use('/api', router);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Catch-all for 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
