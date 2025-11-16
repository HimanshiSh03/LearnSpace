const mongoose = require('mongoose');

const connectToDB = async () => {
  console.log('Skipping MongoDB connection - using in-memory storage for demonstration');
  // For demo purposes, we're not connecting to MongoDB
  // In a production environment, you would connect to MongoDB here
};

module.exports = connectToDB;
