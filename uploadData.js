const mongoose = require('mongoose');
const Book = require('./book'); // Import the Book model
const data = require('./data.json'); // Replace with your JSON data file

async function uploadData() {
  try {
    await mongoose.connect('mongodb+srv://sumankumarbisoi:suman123@cluster0.m3h7k0x.mongodb.net/', {
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