import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Registration from './pages/Registration';
import Login from './pages/Login';
import VerifyIdentity from './pages/VerifyIdentity';
import ConsumerDashboard from './pages/ConsumerDashboard';
import SellerLayout from './layouts/SellerLayout';
import SellerOverview from './pages/SellerOverview';
import Catalog from './pages/Catalog';
import AddProduct from './pages/AddProduct';
import ProfileSettings from './pages/ProfileSettings';
import MyListings from './pages/MyListings';
import BudgetHelper from './pages/BudgetHelper';
import SalesForecast from './pages/SalesForecast';
import EditProduct from './pages/EditProduct';
import AIChatbot from './components/AIChatbot';
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
        {/* Verify Identity page */}
        <Route path="/verify" element={<VerifyIdentity />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Seller Dashboard nested routes */}
        <Route path="/seller-dashboard" element={<SellerLayout />}>
          <Route index element={<SellerOverview />} />
          <Route path="overview" element={<SellerOverview />} />
          <Route path="list" element={<MyListings />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:foodId" element={<EditProduct />} />
          <Route path="forecast" element={<SalesForecast />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* Consumer Dashboard pages */}
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />

        {/* Marketplace Catalog */}
        <Route path="/categories" element={<Catalog />} />

        {/* AI Features (Top Level or Consumer) */}
        <Route path="/budget-helper" element={<BudgetHelper />} />

        {/* Generic/Shared User Settings */}
        <Route path="/settings" element={<ProfileSettings />} />

        {/* Redirects for legacy routes */}
        <Route path="/seller-profile" element={<Navigate to="/seller-dashboard/settings" replace />} />
        <Route path="/my-listings" element={<Navigate to="/seller-dashboard/list" replace />} />
        <Route path="/add-product" element={<Navigate to="/seller-dashboard/add" replace />} />
        <Route path="/sales-forecast" element={<Navigate to="/seller-dashboard/forecast" replace />} />
      </Routes>
      <AIChatbot />
    </Router>
  );
}

export default App;
