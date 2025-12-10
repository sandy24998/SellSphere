require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routers
const sellAndBuyRoutes = require('./routes/sellAndBuyRoutes');
const matchRoutes = require('./routes/matchRoutes');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.options('*', cors());


// -------------------------------
// ✅ Mount BOTH routers cleanly
// -------------------------------

// OLD PROJECT (Sell & Buy APIs)
app.use('/api', sellAndBuyRoutes);
// Example endpoints remain:
// /api/addProduct
// /api/updateProduct
// /api/getProducts

// NEW PROJECT (Match APIs)
app.use('/api/matches', matchRoutes);
// Example endpoints:
// /api/matches/add
// /api/matches/update/:id
// /api/matches/all


// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend running" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
