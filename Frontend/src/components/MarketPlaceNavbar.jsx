import React from 'react';
import { Link } from 'react-router-dom';

const MarketplaceNavbar = () => {
  return (
    <nav className="marketplace-navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          ChakulaKonnect
        </Link>
        <div className="nav-links">
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default MarketplaceNavbar;
