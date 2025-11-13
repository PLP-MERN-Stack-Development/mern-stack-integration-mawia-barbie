// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async (uri = process.env.MONGO_URI) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error', err);
    process.exit(1);
  }
};

module.exports = connectDB;
