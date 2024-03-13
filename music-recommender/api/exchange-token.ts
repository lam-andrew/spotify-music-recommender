// /api/exchange-token.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'
import { stringify } from 'querystring'

export default async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  const code = req.body
  if (!code) {
    return res.status(400).send({ error: 'Code is required' })
  }

  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: stringify({
      code: code,
      redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  }
  try {
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions,
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Spotify API response error:', errorText)
      return res.status(500).send('Error from Spotify API')
    }

    const data = await response.json()
    res.status(200).json(data) // Correctly sending JSON response back
  } catch (error) {
    console.error('Error exchanging code for token:', error)
    res.status(500).send('Internal Server Error') // Correctly sending error response back
  }
}
