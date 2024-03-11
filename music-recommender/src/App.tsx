import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import your page components
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Set HomePage as the default by associating it with the root path */}
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        {/* Catch-all route for 404 Not Found pages */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
