// /api/exchange-token.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import { stringify } from 'querystring';

export default async (req: VercelRequest, res: VercelResponse) => {
  console.log("starting exchange-token")
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  const { code } = req.body;

  if (!code) {
    return res.status(400).send({ error: 'Code is required' });
  }

  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
  console.log("EARLY ON")
  const authOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
    body: stringify({
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    console.log("REQUESTING ACCESS TOKEN EXCHANGE")
    if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
        console.log("RESPONSE OK")
        const data = await response.json();
        if (data.error) {
          return res.status(400).json({ error: data.error });
        }
        return res.status(200).json(data);
    } else {
        // Not a successful response, or not JSON
        const text = await response.text(); // Read response body as text
        console.error('Unexpected response:', text);
    }
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return res.status(500).send('Internal Server Error');
  }
};
