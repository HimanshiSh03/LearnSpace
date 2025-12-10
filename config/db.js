const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    // Get MongoDB URI from environment variables or use default local URI
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wocslearnspace';
    
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Running in offline mode - some features may be limited');
    // Continue running the application even if MongoDB is not available
  }
};

module.exports = connectToDB;