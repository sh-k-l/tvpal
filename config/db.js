const mongoose = require('mongoose');
const { DATABASE_URI } = require('../constants');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to database.');
  } catch (error) {
    console.log('Failed to connect to database.');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
