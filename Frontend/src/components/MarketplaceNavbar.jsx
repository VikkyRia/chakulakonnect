import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, User, Briefcase, Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/image/SVG.png";
import { useCart } from "../context/CartContext";

function MarketplaceNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItems, basketItems } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/marketplace?search=${query}`);
    setIsMobileMenuOpen(false);
  };

  const isMarketplaceActive =
    location.pathname.startsWith("/marketplace") ||
    location.pathname.startsWith("/foods");

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => navigate('/')}>
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-100">
              <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="hidden sm:block text-xl font-black tracking-tight text-slate-900 italic">
              Chakula<span className="text-emerald-500">Konnect</span>
            </span>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden lg:flex items-center gap-8 ml-8">
            <NavLink
              to="/marketplace"
              className={({ isActive }) => `text-xs font-black uppercase tracking-widest italic transition-all ${isActive || isMarketplaceActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) => `text-xs font-black uppercase tracking-widest italic transition-all ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              Categories
            </NavLink>
            <NavLink
              to="/bulk"
              className={({ isActive }) => `text-xs font-black uppercase tracking-widest italic transition-all ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              Bulk Orders
            </NavLink>
          </div>

          {/* SearchBar Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg relative group ml-auto">
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search marketplace..."
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white font-bold text-sm transition-all italic"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              to="/cart"
              className="p-3 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-2xl transition-all relative group"
            >
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 p-1.5 pl-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-emerald-100 transition-all group"
            >
              <span className="hidden xl:block text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                Account
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-600 transition-all">
                <User size={18} />
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 text-slate-400 hover:text-emerald-500 rounded-2xl transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-50 p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm italic"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <div className="space-y-2">
            <NavLink to="/marketplace" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 font-black text-xs uppercase tracking-widest italic text-slate-900">
              Marketplace <ArrowRight size={16} />
            </NavLink>
            <NavLink to="/categories" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 font-black text-xs uppercase tracking-widest italic text-slate-900">
              Categories <ArrowRight size={16} />
            </NavLink>
            <NavLink to="/bulk" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 font-black text-xs uppercase tracking-widest italic text-slate-900">
              Bulk Orders <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default MarketplaceNavbar;
