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
import OrderHub from './pages/OrderHub';
import MarketAlerts from './pages/MarketAlerts';
import AIChatbot from './components/AIChatbot';
import { getAllUsers } from './utils/auth';
import './App.css';
import Marketplace from './layouts/Marketplace';
import FoodDetails from './pages/Fooddetails';
import Profile from './pages/Profile'
import Cart from './pages/Cart';
import ConsumerLayout from './layouts/ConsumerLayout';
import OrderHistory from './pages/OrderHistory';
import Favorites from './pages/Favorites';
import TrackOrders from './pages/TrackOrders';




function App() {
  // Initialize demo user on app load
  useEffect(() => {
    // Check if users already exist in localStorage
    const users = getAllUsers();

    // If no users exist, add a demo user for testing
    if (users.length === 0) {
      const demoUsers = [
        {
          fullName: 'Demo Consumer',
          email: 'demo@example.com',
          password: 'demo123',
          role: 'Consumer'
        },
        {
          fullName: 'Demo Seller',
          email: 'seller@example.com',
          password: 'seller123',
          role: 'Seller'
        }
      ];
      localStorage.setItem('users', JSON.stringify(demoUsers));
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
          <Route path="orders" element={<OrderHub />} />
          <Route path="alerts" element={<MarketAlerts />} />
          <Route path="forecast" element={<SalesForecast />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* Consumer Dashboard nested routes */}
        <Route path="/consumer-dashboard" element={<ConsumerLayout />}>
          <Route index element={<ConsumerDashboard />} />
          <Route path="budget" element={<BudgetHelper />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="track" element={<TrackOrders />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        <Route element={<Marketplace />}>
          <Route path="/marketplace" element={<Catalog />} />
          <Route path="/foods/:id" element={<FoodDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        {/* Marketplace Catalog */}
        <Route path="/categories" element={<Catalog />} />

        {/* AI Features (Top Level or Consumer) */}
        <Route path="/budget-helper" element={<Navigate to="/consumer-dashboard/budget" replace />} />

        {/* Generic/Shared User Settings */}
        <Route path="/settings" element={<ProfileSettings />} />

        {/* Redirects for legacy routes */}
        <Route path="/seller-profile" element={<Navigate to="/seller-dashboard/settings" replace />} />
        <Route path="/my-listings" element={<Navigate to="/seller-dashboard/list" replace />} />
        <Route path="/add-product" element={<Navigate to="/seller-dashboard/add" replace />} />
        <Route path="/sales-forecast" element={<Navigate to="/seller-dashboard/forecast" replace />} />
        <Route path="/orders" element={<Navigate to="/consumer-dashboard/orders" replace />} />
        <Route path="/favorites" element={<Navigate to="/consumer-dashboard/favorites" replace />} />
        <Route path="/track" element={<Navigate to="/consumer-dashboard/track" replace />} />
      </Routes>
      <AIChatbot />
    </Router>
  );
}

export default App;
