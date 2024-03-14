import React from 'react';

const LoginPage = () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.error(
      'Spotify client ID or redirect URI is undefined. Check environment variables.',
    );
  }

  const scopes = [
    'user-read-private',
    'user-read-email',
    // Add other scopes as needed
  ];

  const getSpotifyAuthUrl = () => {
    const queryParams = new URLSearchParams({
      client_id: clientId ?? '',
      response_type: 'code',
      redirect_uri: redirectUri ?? '',
      scope: scopes.join(' '),
    }).toString();
    return `https://accounts.spotify.com/authorize?${queryParams}`;
  };

  return (
    <div className="bg-gradient-to-br from-green-900 to-zinc-900 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Spotify Music Recommender</h1>
        <p className="mb-8 text-lg">Discover music tailored to your taste.</p>
        <a
          href={getSpotifyAuthUrl()}
          className="inline-block bg-spotify-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-150 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Login with Spotify
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
