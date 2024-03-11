import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Extract the code from URL query parameters
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      exchangeCodeForToken(code);
    } else {
      // Handle error or missing code
      navigate('/error'); // Redirect to an error page or home
    }
  }, [navigate]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch('https://spotify-music-recommender-al.vercel.app/api/exchange-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.access_token) {
        console.log('DATA HAS ACCESS TOKEN')
        // Save the access token for later use in API requests
        localStorage.setItem('spotifyAccessToken', data.access_token);
        
        navigate('/homepage'); // Redirect to homepage or another route after successful login
      } else {
        console.error('Token exchange failed:', data);
        navigate('/error'); // Redirect to an error page or home
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      navigate('/error'); // Redirect to an error page or home
    }
  };

  return <div>Processing.....</div>;
};

export default CallbackPage;
