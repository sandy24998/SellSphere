require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set in .env');

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB Connected');

    // Only start server after DB connection
    app.listen(PORT, '0.0.0.0', () => {
      console.log("========================================");
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🚀 Server is running on port: ${PORT}`);
      console.log("========================================");
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

startServer();
