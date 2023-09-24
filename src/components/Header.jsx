import React, { useEffect, useState } from 'react'
import img from '../assets/img4.png'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
const Header = () => {
  const [books, setBooks] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    // Fetch data from your API
    fetch('http://localhost:3001/api/books') // Replace with your API URL
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const handleSearch = (searchResults) => {


    setSearchResult(searchResults);
    console.log(searchResults);


  }

  return (
    <>
      <div className='grid grid-cols-2 '>
        <div className='flex flex-col justify-start items-start text-left break-words m-10'>
          <h1 className='first-letter:text-8xl first-letter:text-[#342112] text-6xl font-serif'>
            Buy and</h1><h1 className='first-letter:text-8xl first-letter:text-[#342112] text-6xl font-serif'>Sell your
            textbooks for the
            best price
          </h1>
          <div className='mt-6 text-lg text-gray-500'>
            <p>From applied literature to educational resources, we have a lot of textbooks to offer you. We provide only the best books for rent.</p>
          </div>
          <div className='flex mt-5 justify-start items-center text-right'>
            <SearchBar books={books} onSearch={handleSearch} />
          </div>
        </div>
        <div className='m-10 '>
          <img src={img} className='shadow-b-sm shadow-[#342112]' alt="" />
        </div>
        <div className='col-start-1 col-end-4 bg-white m-10'>


          {searchResult !== null ? (
            <div className="container my-12 mx-auto px-4 md:px-12">
            <h1 className='flex justify-center items-centers m-2 text-6xl font-bold font-serif'>Search Result:</h1>
          <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
            {
              searchResult.map((book, index) => (
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 shadow-xl rounded-xl " key={index}>
                  <article className="overflow-hidden rounded-lg ">
                    <header className=" items-center justify-between leading-none p-2 md:p-4">
                      <a className="flex justify-center items-center no-underline hover:underline text-black" href="#">
                        <img alt="Placeholder" className="flex justify-center items-center rounded-md shadow-lg shadow-[#000]  w-[50%] h-[50%]" src={book.imageLink} />

                      </a>
                    </header>
                    <div className='flex flex-col m-2 p-2 '>
                      <p className=" flex justify-center items-center mb-4 ml-2 text-2xl font-bold font-mono ">
                        {book.title}
                      </p>
                      <p className='text-md mb-3'><span className='text-gray-500 font-mono flex justify-center items-center text-left text-xl '>Author: {book.author}</span></p>
                      <p className='text-md mb-3'><span className='text-gray-500 font-mono flex justify-center items-center text-left text-xl '>Year: {book.year}</span></p>
                      <p className='text-md mb-3'><span className='text-gray-500 font-mono flex justify-center items-center text-left text-xl '>Genre: {book.genre} </span></p>
                    </div>

                  </article>

                </div>
              ))
            }
          </div>
        </div>
          ) : (
            <div className="container my-12 mx-auto px-4 md:px-12 ">
                <h1 className='flex justify-center items-centers m-2 text-6xl font-bold font-serif text-[#342112]'>Popular Books</h1>
              <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
                {
                  books.map((book, index) => (
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 shadow-lg shadow-[#342112] rounded-xl " key={index}>
                      <article className="overflow-hidden rounded-lg ">
                        <header className=" items-center justify-between leading-none p-2 md:p-4">
                          <a className="flex justify-center items-center no-underline hover:underline text-black" href="#">
                            <img alt="Placeholder" className="flex justify-center items-center rounded-md shadow-lg shadow-[#342112]  w-[50%] h-[50%]" src={book.imageLink} />

                          </a>
                        </header>
                        <div className='flex flex-col m-2 p-2 '>
                          <p className=" flex justify-center items-center mb-4 ml-2 text-2xl font-bold font-serif ">
                            {book.title}
                          </p>
                          <p className='text-md mb-3'><span className='text-gray-500 font-serif flex justify-center items-center text-left text-xl '>Author: {book.author}</span></p>
                          <p className='text-md mb-3'><span className='text-gray-500 font-serif flex justify-center items-center text-left text-xl '>Year: {book.year}</span></p>
                          <p className='text-md mb-3'><span className='text-gray-500 font-serif flex justify-center items-center text-left text-xl '>Genre: {book.genre} </span></p>
                          <Link to={`/api/books/book/${book._id}`}>
                          <p>Learn more</p>
                          </Link>
                        </div>

                      </article>

                    </div>
                  ))
                }
              </div>
            </div>

          )}
        </div>
      </div>
    </>
  )
}

export default Header
