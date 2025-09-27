const express = require("express");
const cors = require("cors");
const router = require('./routes/sellAndBuyRoutes');
const connectDB = require('./config/db');

require("dotenv").config();
connectDB();

const app = express();

app.use(cors()); // Correct cors usage
app.use(express.json()); // Correct json body parsing
app.use(express.urlencoded({ extended: true })); // Correct urlencoded body parsing
app.use('/api', router);

module.exports = app;