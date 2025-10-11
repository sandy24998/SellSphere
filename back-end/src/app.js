const express = require("express");
const cors = require("cors");
const router = require('./routes/sellAndBuyRoutes');
const connectDB = require('./config/db');

require("dotenv").config();
connectDB();

const app = express();

// Enable CORS for frontend with preflight support
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests globally
app.options('*', cors());

app.use(express.json()); // Correct json body parsing
app.use(express.urlencoded({ extended: true })); // Correct urlencoded body parsing
app.use('/api', router);

module.exports = app;