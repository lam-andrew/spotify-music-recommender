import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = new URLSearchParams(location.search).get('code');

    if (accessToken) {
      // Save the access token in local storage, a context, or wherever suits your app's architecture
      localStorage.setItem('spotifyAccessToken', accessToken);
      
      // Redirect to the homepage or wherever is appropriate after successful login
      navigate('/homepage');
    }
  }, [location, history]);

  return <div>Redirecting...</div>;
};

export default CallbackPage;
