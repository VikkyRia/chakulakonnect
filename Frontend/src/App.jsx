import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VerifyIdentity from './pages/VerifyIdentity';
import ConsumerDashboard from './pages/ConsumerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import { getAllUsers } from './utils/auth';
import './App.css';
import Marketplace from './layouts/Marketplace';
import FoodDetails from './pages/Fooddetails';
import Profile from './pages/Profile'
import Cart from './pages/Cart';




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
        {/* Verify Identity page */}
        <Route path="/verify" element={<VerifyIdentity />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />

        <Route element={<Marketplace />}>
    <Route path="/marketplace" element={<Marketplace />} />
    <Route path="/foods/:id" element={<FoodDetails />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/cart" element={<Cart />} />
</Route>

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
