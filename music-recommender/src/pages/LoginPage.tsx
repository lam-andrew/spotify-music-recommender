import React from 'react'

const LoginPage = () => {
  // Your Spotify Application's Client ID
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID

  // The URI to redirect to after the user grants or denies permission
  // This must be registered in your Spotify application settings on the Spotify Dashboard
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI
  if (!clientId || !redirectUri) {
    console.error(
      'Spotify client ID or redirect URI is undefined. Check environment variables.',
    )
    // Optionally, return a fallback URL or handle the error more gracefully
  }

  // The scopes determine which permissions your app has on the user's account
  // Adjust the scopes according to your application's needs
  const scopes = [
    'user-read-private',
    'user-read-email',
    // Add other scopes as needed
  ]

  // Generates the Spotify login URL with the necessary query parameters
  const getSpotifyAuthUrl = () => {
    const queryParams = new URLSearchParams({
      client_id: clientId ?? '', // Ensure clientId is a string
      response_type: 'code',
      redirect_uri: redirectUri ?? '', // Ensure redirectUri is a string
      scope: scopes.join(' '),
    }).toString()
    return `https://accounts.spotify.com/authorize?${queryParams}`
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Login to Spotify Music Recommender</h1>
      <a
        href={getSpotifyAuthUrl()}
        className="loginButton bg-spotify-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out"
        style={{ backgroundColor: '#1DB954' }}
      >
        Login with Spotify
      </a>
    </div>
  );  
}

export default LoginPage
