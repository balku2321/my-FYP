const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    // Log the error and exit the process
    console.error(err.message);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
