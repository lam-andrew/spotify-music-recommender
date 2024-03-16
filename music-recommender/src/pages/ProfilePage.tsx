import React, { useState, useEffect } from 'react';

interface SpotifyUserProfile {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content?: {
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
  images: Array<{ url: string; height?: number | null; width?: number | null }>;
  product?: string;
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
    return <div className="min-h-screen bg-gradient-to-br from-green-900 to-black text-white flex items-center justify-center">Loading profile...</div>;
  }

  // Find the best image available or use a default if none are provided
  const profileImageUrl = userProfile.images.length > 0 ? userProfile.images[0].url : 'path/to/default/profile/image.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-800 to-zinc-900 text-white flex justify-center items-center p-8">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          {userProfile.images.length > 0 && (
            <img src={profileImageUrl} alt="Profile" className="mx-auto rounded-full" style={{ height: '300px', width: '300px' }} />
          )}
          <h2 className="text-2xl font-thin text-light-blue mt-4 mb-2">{userProfile.display_name}</h2>
          <p>{userProfile.email}</p>
          <p>Followers: {userProfile.followers.total}</p>
          <p>Country: {userProfile.country}</p>
          <p>Subscription: {userProfile.product}</p>
          <a href={userProfile.external_urls.spotify} className="text-light-orange hover:underline mt-2">View on Spotify</a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
