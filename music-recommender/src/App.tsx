import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

// Import your page components
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CallbackPage from './pages/CallbackPage';
import ProfilePage from './pages/ProfilePage';

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App = () => {
  const location = useLocation(); // Hook to get the current location
  
  return (
    <div className='font-mono font-thin'>
      {/* Conditionally render NavigationBar */}
      {location.pathname !== '/' && location.pathname !== '/callback' && <NavigationBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
      
  );
};

export default AppWrapper;
