import React, { useState } from 'react'

interface TrackObject {
  album: {
    images: Array<{ url: string; height?: number; width?: number }>
    name: string
  }
  artists: Array<{ name: string }>
  name: string
  preview_url: string | null
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<TrackObject[]>([])
  const accessToken = localStorage.getItem('spotifyAccessToken')
  const [isLoading, setIsLoading] = useState(false)

  // Use React.ChangeEvent<HTMLInputElement> for input change events
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault() // Prevent the form from submitting in the traditional way
    console.log('Searching for:', searchQuery)
    setIsLoading(true) // Start loading

    try {
      const vercel_response = await fetch(
        `https://spotify-music-recommender-al.vercel.app/api/spotify-search?searchQuery=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const data = await vercel_response.json()

      // Store the entire item object or extract only the parts you need
      setSearchResults(data.tracks.items)
    } catch (error) {
      console.error('Search API call failed:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false) // Stop loading regardless of success or failure
    }
  }

  return (
    <div className="min-h-screen bg-radial-gradient-center text-white flex justify-center items-center p-8">
      <div
        className="max-w-4xl mx-auto flex flex-col justify-center items-center"
        style={{ minHeight: '80vh' }}
      >
        <h1 className="text-4xl font-thin mb-6 text-light-blue">
          Welcome to Spotify Music Recommender
        </h1>
        <p className="mb-8 text-lg">Discover music tailored to your taste.</p>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col gap-5 items-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a song..."
              className="p-2 w-full rounded-md text-black"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center outline outline-light-orange bg-transparent hover:-translate-y-1 text-light-orange font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </form>
        </div>
        <h2 className="mt-10 text-2xl font-thin mb-2 text-light-blue">
          Search Results
        </h2>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-h-96 overflow-auto w-full">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((track, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 p-4 rounded-lg shadow flex flex-col items-center text-center"
                >
                  {track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      alt="Album cover"
                      className="w-3/4 h-auto mb-4"
                    />
                  )}
                  <h3 className="text-lg font-bold text-spotify-green">
                    {track.name}
                  </h3>
                  <p>
                    Artist(s):{' '}
                    {track.artists.map((artist) => artist.name).join(', ')}
                  </p>
                  <p>Album: {track.album.name}</p>
                  {track.preview_url && (
                    <audio controls src={track.preview_url} className="mt-2">
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No results to display</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
