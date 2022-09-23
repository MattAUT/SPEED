const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(
      MONGO_URI
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;