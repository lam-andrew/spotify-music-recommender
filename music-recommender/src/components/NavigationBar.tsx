// components/NavigationBar.jsx or .tsx if using TypeScript
import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-opacity-90 bg-zinc-950 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="font-bold">Spotify Recommender</div>
        <div>
          <Link to="/homepage" className="px-4 py-2 hover:bg-zinc-800 rounded">
            Home
          </Link>
          <Link to="/recommendations" className="px-4 py-2 hover:bg-zinc-800 rounded">
            Recommendations
          </Link>
          <Link
            to="/profilepage"
            className="px-4 py-2 hover:bg-zinc-800 rounded"
          >
            Profile
          </Link>
          <Link to="/" className="px-4 py-2 hover:bg-zinc-800 rounded">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
