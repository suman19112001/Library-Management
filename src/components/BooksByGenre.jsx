// src/components/BooksByGenre.js
import React, { useState, useEffect } from 'react';

function BooksByGenre({ genre }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/books/${genre}`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, [genre]);

  return (
    <div>
      <h2>Books by Genre: {genre}</h2>
      <ul>
        {books?.map((book) => (
          <li key={book._id}>
            <img src={book.imageLink} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Description: {book.description}</p>
            <p>Year: {book.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksByGenre;
