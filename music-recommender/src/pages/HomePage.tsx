import React, { useState } from 'react'

interface TrackObject {
  album: {
    images: Array<{ url: string; height?: number; width?: number }>;
    name: string;
  };
  artists: Array<{ name: string }>;
  name: string;
  preview_url: string | null;
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<TrackObject[]>([]);
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
  
      // Store the entire item object or extract only the parts you need
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.error('Search API call failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };
  

  // Assume the rest of your HomePage component remains the same up to the return statement

return (
  <div className="min-h-screen bg-gradient-to-br from-green-900 to-zinc-900 text-white p-8 flex flex-col items-center justify-center">
    <div className="max-w-4xl w-full">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Spotify Music Recommender</h1>
      <p className="mb-8 text-lg text-center">Discover music tailored to your taste.</p>
      {/* Search Form remains the same */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {searchResults.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((result, index) => (
              <div key={index} className="bg-zinc-900 p-4 rounded-lg shadow flex flex-col items-center">
                {result.album.images.length > 0 && (
                  <img src={result.album.images[0].url} alt="Album Cover" className="w-32 h-32 rounded-full mb-4" />
                )}
                <div className="text-center">
                  <h3 className="text-lg font-bold">{result.name}</h3>
                  <p>{result.artists.map(artist => artist.name).join(', ')}</p>
                  <p className="text-sm">{result.album.name}</p>
                  {result.preview_url && (
                    <audio controls src={result.preview_url}>
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No results to display</p>
        )}
      </div>
    </div>
  </div>
);

};

export default HomePage
