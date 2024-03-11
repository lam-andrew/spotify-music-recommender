// api/spotify-search.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

export default async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*') // Adjust this to be more restrictive if necessary
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { searchQuery } = req.query

  if (!searchQuery) {
    res.status(400).send('Search query is required')
    return
  }

  const accessToken = localStorage.getItem('spotifyAccessToken');
  const endpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    searchQuery as string,
  )}&type=track,artist`

  try {
    const spotifyResponse = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
