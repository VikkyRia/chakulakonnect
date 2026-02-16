import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { getAllUsers } from './utils/auth';
import './App.css';

function App() {
  // Initialize demo user on app load
  useEffect(() => {
    // Check if users already exist in localStorage
    const users = getAllUsers();
    
    // If no users exist, add a demo user for testing
    if (users.length === 0) {
      const demoUser = {
        fullName: 'Demo User',
        email: 'demo@example.com',
        password: 'demo123',
        role: 'Consumer'
      };
      localStorage.setItem('users', JSON.stringify([demoUser]));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Landing page - default route */}
        <Route path="/" element={<Landing />} />

        {/* Registration page */}
        <Route path="/register" element={<Registration />} />
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
