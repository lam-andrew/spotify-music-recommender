import React, { useState } from 'react'

interface ExternalUrls {
  spotify: string
}

interface Image {
  url: string
  height: number
  width: number
}

interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface Album {
  album_type: string
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  type: string
  uri: string
  artists: Artist[]
}

interface TrackObject {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
    ean?: string
    upc?: string
  }
  external_urls: ExternalUrls
  href: string
  id: string
  is_playable?: boolean
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: string
  uri: string
  is_local: boolean
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
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div>Spotify like HomePage with Images and Links</div>
      <div>e.g. Popular Songs, Albums, etc.</div>
    </div>
  )
}

export default HomePage
