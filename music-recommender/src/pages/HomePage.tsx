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
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to Spotify Music Recommender</h1>
        <p className="mb-8 text-lg">Discover music tailored to your taste.</p>
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
              className="inline-flex items-center justify-center bg-spotify-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                    {/* Spinner SVG path */}
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>
        <h2 className="mt-8 text-2xl font-bold mb-2">Search Results</h2>
        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg max-h-96 overflow-auto">
          {searchResults.length > 0 ? (
            <ul className="list-disc list-inside">
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
