const express = require("express");
const cors = require("cors");
const router = require('./routes/sellAndBuyRoutes');
const connectDB = require('./config/db');

require("dotenv").config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); // Correct json body parsing
app.use(express.urlencoded({ extended: true })); // Correct urlencoded body parsing
app.use('/api', router);

module.exports = app;