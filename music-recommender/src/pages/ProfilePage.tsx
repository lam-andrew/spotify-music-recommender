import React, { useState, useEffect } from 'react';

interface SpotifyUserProfile {
    display_name: string;
    email: string;
    images: Array<{ url: string }>;
    id: string;
  }
  

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState<SpotifyUserProfile | null>(null);
  const accessToken = localStorage.getItem('spotifyAccessToken');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;
      
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch profile');
        return;
      }

      const data: SpotifyUserProfile = await response.json();
      setUserProfile(data);
    };

    fetchProfile();
  }, [accessToken]);

  if (!userProfile) {
    return <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">User Profile</h1>
        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-4">
            <img src={userProfile.images[0]?.url} alt="Profile" className="w-24 h-24 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold">{userProfile.display_name}</h2>
              <p>{userProfile.email}</p>
              <p>ID: {userProfile.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
