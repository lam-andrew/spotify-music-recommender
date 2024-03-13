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
    <div>
      <h1 className='text-red bg-black'>Login to Spotify</h1>
      <a href={getSpotifyAuthUrl()} className="loginButton">
        Login with Spotify
      </a>
    </div>
  )
}

export default LoginPage
