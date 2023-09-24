// App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Book from './components/Book';
import About from './components/About';
import Navbar from './components/Navbar';
import BookDetail from './components/BookDetail';



function App() {
  return (
    <>
      <div className='flex h-[100%]'>

        <div >
          <Navbar />
        </div>
        <Routes>

          <Route path={'/'} element={<Main />}></Route>
          <Route path={'/Books'} element={<Book />}></Route>
          <Route path={'/About'} element={<About />}></Route>
          <Route path={'/api/books/book/:id'} element={<BookDetail />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
