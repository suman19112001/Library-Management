const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  author: String,
  country: String,
  imageLink: String,
  language: String,
  link: String,
  pages: Number,
  title: String,
  year: String,
  count: Number,
  description: String,
  genre: String,
  id: Number,
});

module.exports = mongoose.model('Book', bookSchema);