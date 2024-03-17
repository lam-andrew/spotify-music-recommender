import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

export default async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  const accessToken = req.headers.authorization?.split(' ')[1]

  if (!accessToken) {
    return res.status(401).json({ error: 'Access Token is required' })
  }

  try {
    const spotifyResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!spotifyResponse.ok) {
      const message = await spotifyResponse.text()
      return res.status(spotifyResponse.status).json({ error: message })
    }

    const data = await spotifyResponse.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
