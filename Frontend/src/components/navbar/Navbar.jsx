import "./Navbar.css";
import logo from "../../assets/image/logo.svg";
import bell from "../../assets/image/bell.svg";
import cart from "../../assets/image/cart.svg";
import searchIcon from "../../assets/image/search.svg";
import profile from "../../assets/image/Profile.svg";

import { useCart } from "../../context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Read search from URL
  const params = new URLSearchParams(location.search);
  const searchFromURL = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(searchFromURL);

  // Keep input synced when URL changes (back button support)
  useEffect(() => {
    setSearchTerm(searchFromURL);
  }, [searchFromURL]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchTerm.trim();

      // Preserve existing category if it exists
      const currentParams = new URLSearchParams(location.search);
      const category = currentParams.get("category");

      const newParams = new URLSearchParams();

      if (category) newParams.append("category", category);
      if (query) newParams.append("search", query);

      navigate(`/consumer-dashboard?${newParams.toString()}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LEFT */}
        <div className="navbar-left">
          <img src={logo} alt="logo" className="logo" />
          <span className="brand-nav">
            Chakula<span className="brand-green">Konnect</span>
          </span>
        </div>

        {/* SEARCH */}
        <div className="search-container">
          <img src={searchIcon} alt="search" className="search-icon" />
          <input
            type="text"
            placeholder="Search for fresh produce..."
            className="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          <img src={bell} alt="bell" className="nav-icon" />

          {/* CART WITH BADGE */}
          <div className="cart-wrapper">
            <img src={cart} alt="cart" className="nav-icon" />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>

          {/* PROFILE */}
          <Link to="/profile" className="profile-section">
            <div className="avatar-wrapper">
              <img src={profile} alt="profile" />
            </div>
            <span className="username">
              {JSON.parse(localStorage.getItem("currentUser"))?.fullName || "User"}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;