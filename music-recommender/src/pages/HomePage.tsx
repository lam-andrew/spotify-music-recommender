import React, { useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]); // Specify the array type if known, e.g., string[]

  // Use React.ChangeEvent<HTMLInputElement> for input change events
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Use React.FormEvent<HTMLFormElement> for form submission events
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    console.log('Searching for:', searchQuery);
    // Simulate setting search results; in a real app, this might be where you make an API call
    setSearchResults([searchQuery]);
  };

  return (
    <div>
      <h1>Welcome to Spotify Music Recommender</h1>
      <p>This is the Home Page of Spotify Music Recommender</p>
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a song..."
        />
        <button type="submit">Search</button>
      </form>
      {/* Container for Search Results */}
      <div>
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li> // Key can be index since search results may not have a unique identifier
            ))}
          </ul>
        ) : (
          <p>No results to display</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
