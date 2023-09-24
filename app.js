// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('./db'); // Import the MongoDB connection
const Book = require('./book'); // Import the Book model

const app = express();

app.use(cors());

// Define a route to get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/books/:genre', async (req, res) => {
  const genre = req.params.genre;

  try {
    const books = await Book.find({ genre }).maxTimeMS(30000);

    if (books.length === 0) {
      res.status(404).json({ error: 'No books found for this genre' });
    } else {
      res.json(books);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/books/book/:id', async (req, res) => {
    const bookId = req.params.id;
    console.log(bookId);
    try {
      const book = await Book.findById(bookId.trim()).maxTimeMS(30000);
      console.log(book)
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      res.json(book);
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



app.get('/api/books/search/:query', async (req, res) => {
  const query = req.params.query;
  console.log('Received query:', query);
  try {
    
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
        { author: { $regex: query, $options: 'i' } }, // Case-insensitive author search
        { genre: { $regex: query, $options: 'i' } }, // Case-insensitive genre search
        { year: { $regex: query, $options: 'i' } }// Case-insensitive year search
      ],
    }).maxTimeMS(30000);

    if (books.length === 0) {
      res.status(404).json({ error: 'No books found matching the query' });
    } else {
      res.json(books);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});