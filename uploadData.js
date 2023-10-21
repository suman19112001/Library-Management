const mongoose = require('mongoose');
const Book = require('./book'); // Import the Book model
const data = require('./data.json');
require('dotenv').config();

async function uploadData() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (const bookData of data) {
      const book = new Book(bookData);
      await book.save();
    }

    console.log('Data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading data:', error);
  } finally {
    mongoose.disconnect();
  }
}

uploadData();
