import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = ({ match }) => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/books/book/${id}`)
            .then((response) => response.json())
            .then((data) => setBook(data))
            .catch((error) => console.error('Error fetching book details:', error));
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-6">
            {/* <div className=" grid grid-col-2 max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg ">
                <div>


                </div>
                <div>
                    <h2 className="text-2xl font-semibold font-mono">{book.title}</h2>
                    
                    
                </div>
            </div> */}
            <div class="grid grid-rows-3 grid-flow-col gap-4 bg-[#F5F3EF] p-6">
                <div class="row-span-3 ...">

                    <img src={book.imageLink} alt={book.title} className="mt-4 w-full h-[50vh]" />
                </div>
                <div class="col-span-2 flex justify-center items-center">
                    <p className="text-gray-800 text-5xl font-mono"><span className='text-3xl'> Author:</span> {book.author}</p>
                </div>
                <div class="row-span-2 col-span-2 ...">
                    <p className="text-gray-800 text-2xl font-serif"><span className='text-xl'>Year:</span> {book.year}</p>
                    <p className="text-gray-800 text-2xl font-serif"><span className='text-xl'>Genre:</span> {book.genre}</p>
                    <p className="text-gray-800 text-2xl font-serif"><span className='text-xl'>Description:</span> {book.description}</p>
                    <p className="text-gray-800 text-2xl font-serif"><span className='text-xl'>No. of copies:</span> {book.count}</p>
                </div>
            </div>
        </div>

    );
};

export default BookDetail;
