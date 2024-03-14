import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Extract the accessToken from the Authorization header
  const accessToken = req.headers.authorization?.split(' ')[1];
  const { trackId } = req.query;

  if (!accessToken) {
    return res.status(401).json({ error: 'Access Token is required' });
  }

  if (!trackId) {
    return res.status(400).json({ error: 'Track ID is required' });
  }

  try {
    // Construct the URL with the seed track ID for recommendations
    const recommendationsUrl = `https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}&limit=10`; // Adjust limit as needed

    const spotifyResponse = await fetch(recommendationsUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!spotifyResponse.ok) {
      // Attempt to read the error message from the response body
      const message = await spotifyResponse.text();
      return res.status(spotifyResponse.status).json({ error: message });
    }

    // Parse the JSON response containing the recommendations
    const recommendationsData = await spotifyResponse.json();
    // Send the recommendations data back to the client
    res.status(200).json(recommendationsData);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
