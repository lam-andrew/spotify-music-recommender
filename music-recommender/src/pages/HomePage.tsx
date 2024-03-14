import React, { useState } from 'react'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([]) // Specify the array type if known, e.g., string[]
  const accessToken = localStorage.getItem('spotifyAccessToken');
  const [isLoading, setIsLoading] = useState(false);


  // Use React.ChangeEvent<HTMLInputElement> for input change events
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    console.log('Searching for:', searchQuery);
    setIsLoading(true); // Start loading
  
    try {
      const vercel_response = await fetch(
        `https://spotify-music-recommender-al.vercel.app/api/spotify-search?searchQuery=${encodeURIComponent(searchQuery)}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
      const data = await vercel_response.json();
      const tracks = data.tracks.items.map((item: any) => item.name);
      setSearchResults(tracks);
    } catch (error) {
      console.error('Search API call failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to Spotify Music Recommender</h1>
        <p className="mb-8">This is the Home Page of Spotify Music Recommender</p>
        {/* Search Form */}
        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4 items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a song..."
              className="p-2 w-full rounded-md text-black"
            />
            <button
              type="submit"
              className="bg-spotify-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  {/* Spinner SVG path */}
                  Searching
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>
        {/* Container for Search Results */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Search Results</h2>
          {searchResults.length > 0 ? (
            <ul className="list-disc list-inside pl-4">
              {searchResults.map((result, index) => (
                <li key={index} className="mb-1">{result}</li>
              ))}
            </ul>
          ) : (
            <p>No results to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage
