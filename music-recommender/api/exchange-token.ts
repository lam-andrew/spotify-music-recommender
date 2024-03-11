// /api/exchange-token.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import { stringify } from 'querystring';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { code } = req.body as { code?: string };

  if (!code) {
    return res.status(400).send({ error: 'Code is required' });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID; // Ensure these are set in your Vercel project settings
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

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
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return res.status(500).send('Internal Server Error');
  }
};
