import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChallengeProvider } from './context/ChallengeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import Reviews from './pages/Reviews';
import Challenges from './pages/Challenges';
import CongratulationsPopup from './components/CongratulationsPopup';
import { useChallenges } from './context/ChallengeContext';

const AppContent = () => {
  const { showCongrats, completedChallenge, closeCongrats } = useChallenges();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
      {showCongrats && completedChallenge && (
        <CongratulationsPopup
          challengeName={completedChallenge.name}
          onClose={closeCongrats}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <ChallengeProvider>
      <Router>
        <AppContent />
      </Router>
    </ChallengeProvider>
  );
}

export default App;