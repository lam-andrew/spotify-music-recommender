import React, { useState, useEffect } from 'react';

interface SpotifyUserProfile {
  country?: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{ url: string; height?: number; width?: number }>;
  product: string;
  type: string;
  uri: string;
}

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<SpotifyUserProfile | null>(null);
  const accessToken = localStorage.getItem('spotifyAccessToken');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;
      
      const response = await fetch('/api/user-profile', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
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
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        {userProfile.images[0] && (
          <img src={userProfile.images[0].url} alt="Profile" className="mx-auto w-32 h-32 rounded-full" />
        )}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{userProfile.display_name}</h2>
          <p>{userProfile.email}</p>
          <p>Country: {userProfile.country}</p>
          <p>Subscription: {userProfile.product}</p>
          <p>Followers: {userProfile.followers.total}</p>
          <a href={userProfile.external_urls.spotify} className="text-spotify-green" target="_blank" rel="noopener noreferrer">View on Spotify</a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
