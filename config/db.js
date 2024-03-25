/* eslint-disable no-console */
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://mongodb:27017/library';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;