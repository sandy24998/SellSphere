const express = require("express");
const cors = require("cors");
const router = require('./routes/sellAndBuyRoutes');
const connectDB = require('./config/db');

require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable JSON and URL-encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS globally for frontend including preflight
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle all OPTIONS preflight requests globally (must come after cors middleware)
app.options('*', cors());

// Mount API routes
app.use('/api', router);

module.exports = app;
