// api/spotify-search.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

export default async (req: VercelRequest, res: VercelResponse) => {
  const { searchQuery } = req.query

  if (!searchQuery) {
    res.status(400).send('Search query is required')
    return
  }

  const spotifyApiKey = process.env.SPOTIFY_API_KEY // Ensure this variable is set in your Vercel project settings
  const endpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    searchQuery as string,
  )}&type=track,artist`

  try {
    const spotifyResponse = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${spotifyApiKey}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await spotifyResponse.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Spotify search error:', error)
    res.status(500).send('Internal Server Error')
  }
}
