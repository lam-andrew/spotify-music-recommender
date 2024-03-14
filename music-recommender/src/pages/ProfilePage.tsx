import React, { useState, useEffect } from 'react';

interface SpotifyUserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: { filter_enabled: boolean; filter_locked: boolean; };
  external_urls: { spotify: string; };
  followers: { href: string | null; total: number; };
  href: string;
  id: string;
  images: Array<{ url: string; height: number | null; width: number | null; }>;
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
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-black text-white">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black text-white flex items-center justify-center p-8">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg max-w-xl">
        <div className="text-center">
          {userProfile.images.length > 0 && (
            <img src={userProfile.images[0].url} alt="Profile" className="w-48 h-48 rounded-full mx-auto" />
          )}
          <h2 className="text-3xl font-bold mt-4">{userProfile.display_name}</h2>
          <p>{userProfile.email}</p>
          <p>Country: {userProfile.country}</p>
          <p>Subscription: {userProfile.product}</p>
          <p>Followers: {userProfile.followers.total}</p>
          <a href={userProfile.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-spotify-green mt-4 inline-block">
            View on Spotify
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
