// SearchBar.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Define how suggestions are rendered
  const renderSuggestion = (suggestion) => (
    <div>{suggestion.title}</div>
  );

  // Define when suggestions are shown
  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.toLowerCase();
    return books.filter((book) => (
      book.title.toLowerCase().includes(inputValueLower) ||
      book.author.toLowerCase().includes(inputValueLower) ||
      book.genre.toLowerCase().includes(inputValueLower) ||
      book.year.toString().includes(inputValueLower)
    ));
  };


  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/books/search/${value}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredData = data.filter((book) => (
        book.title.toLowerCase().includes(value.toLowerCase()) ||
        book.author.toLowerCase().includes(value.toLowerCase()) ||
        book.genre.toLowerCase().includes(value.toLowerCase()) ||
        book.year.toString().includes(value)
      ));
      setSuggestions(filteredData);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    // Handle the selected suggestion, for example, navigate to the book details page
    onSearch(suggestion);
    setValue('');
  };
  const onEnterPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        const response = await fetch(`http://localhost:3001/api/books/search/${value}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter the fetched data based on the user's input query
        const filteredData = data.filter((book) => (
          book.title.toLowerCase().includes(value.toLowerCase()) ||
          book.author.toLowerCase().includes(value.toLowerCase()) ||
          book.genre.toLowerCase().includes(value.toLowerCase()) ||
          book.year.toString().includes(value)
        ));

        // Call the handleSearch function to set the search result
        onSearch(filteredData);
        setValue('');
      } catch (error) {
        console.error('Error fetching and processing search results:', error);
      }
    }
  };


  const inputProps = {
    placeholder: 'Search for books...',
    value,
    onChange: (_, { newValue }) => {
      setValue(newValue);
    },
    onKeyPress: onEnterPress, // Add onKeyPress event handler
  };


  return (
    <>
      <div className=" flex p-4 m-4 bg-white shadow-[#342112] shadow-md w-[20vw] justify-end items-center outline-none">

        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={(suggestion) => suggestion.title}
          renderSuggestion={(suggestion) => (
            <div>{suggestion.title}</div>
          )}
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
        />
        <div>
        <img width="25" height="25" className='text-[#342112] font-bold' src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
