import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/image/logo.svg";
import search from "../assets/image/search.svg";
import cart from "../assets/image/cart.svg";
import basket from "../assets/image/basket.svg";
import User from "../assets/image/User.png";
import "./MarketPlaceNavbar.css";
import { useCart } from "../context/CartContext";

function MarketplaceNavbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItems, basketItems } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/marketplace?search=${query}`);
    setShowSearch(false);
  }; 

  const isMarketplace =
    location.pathname.startsWith("/marketplace") ||
    location.pathname.startsWith("/foods");

  return (
    <nav className="marketplace-navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="brand">
          <img src={logo} alt="logo" />
          <span>ChakulaKonnect</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <NavLink
          to="/marketplace"
          className={isMarketplace ? "active-link" : ""}
        >
          Marketplace
        </NavLink>

        <NavLink to="/sellers">Sellers</NavLink>
        <NavLink to="/bulk">Bulk Orders</NavLink>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* SEARCH */}
        {showSearch ? (
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </form>
        ) : (
          <button
            className="icon-btn"
            onClick={() => setShowSearch(true)}
          >
            <img src={search} alt="search" />
          </button>
        )}

        {/* BASKET */}
        <Link to="/basket" className="icon-btn icon-wrapper">
          <img src={basket} alt="basket" />
          {basketItems.length > 0 && (
            <span className="badge">
              {basketItems.length}
            </span>
          )}
        </Link>

        {/* CART */}
        <Link to="/cart" className="icon-btn icon-wrapper">
          <img src={cart} alt="cart" />
          {totalItems > 0 && (
            <span className="badge">
              {totalItems}
            </span>
          )}
        </Link>

        {/* ACCOUNT */}
        <Link to="/profile" className="account-btn">
          <img src={User} alt="user" />
          Account
        </Link>

      </div>
    </nav>
  );
}

export default MarketplaceNavbar;