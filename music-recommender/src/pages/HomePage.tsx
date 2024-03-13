import React, { useState } from 'react'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([]) // Specify the array type if known, e.g., string[]
  const accessToken = localStorage.getItem('spotifyAccessToken');

  // Use React.ChangeEvent<HTMLInputElement> for input change events
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault() // Prevent the form from submitting in the traditional way
    console.log('Searching for:', searchQuery)

    // Call the serverless function
    try {
      const vercel_response = await fetch(
        `https://spotify-music-recommender-al.vercel.app/api/spotify-search?searchQuery=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      })
      const data = await vercel_response.json()
      // Assuming the Spotify API response structure, adjust as needed
      const tracks = data.tracks.items.map((item: any) => item.name)
      setSearchResults(tracks)
    } catch (error) {
      console.error('Search API call failed:', error)
      setSearchResults([])
    }
  }

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
  )
}

export default HomePage
