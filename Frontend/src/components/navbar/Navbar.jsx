import { useCart } from "../../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Bell, ShoppingBag, User } from "lucide-react";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const params = new URLSearchParams(location.search);
  const searchFromURL = params.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(searchFromURL);

  useEffect(() => {
    setSearchTerm(searchFromURL);
  }, [searchFromURL]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchTerm.trim();
      const currentParams = new URLSearchParams(location.search);
      const category = currentParams.get("category");
      const newParams = new URLSearchParams();
      if (category) newParams.append("category", category);
      if (query) newParams.append("search", query);
      navigate(`/consumer-dashboard?${newParams.toString()}`);
    }
  };

  return (
    <div className="bg-transparent h-20 flex items-center justify-between gap-6 px-4 sm:px-8">
      {/* Title */}
      <div className="hidden lg:block shrink-0">
        <h2 className="text-xl font-black text-slate-900 tracking-tight italic">Explore Marketplace</h2>
      </div>

      {/* SearchBar */}
      <div className="flex-1 max-w-2xl relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
        <input
          type="text"
          placeholder="Search for fresh food..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-sm transition-all italic shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="hidden sm:flex p-3 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-2xl transition-all relative group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <button
          onClick={() => navigate('/cart')}
          className="p-3 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-2xl transition-all relative group"
        >
          <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
          {totalItems > 0 && (
            <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
              {totalItems}
            </span>
          )}
        </button>

        <div className="w-px h-6 bg-slate-200 hidden sm:block mx-1"></div>

        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 p-1.5 pl-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-100 transition-all group shadow-sm"
        >
          <span className="hidden xl:block text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
            {JSON.parse(localStorage.getItem("currentUser"))?.fullName?.split(" ")[0] || "Account"}
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100 group-hover:scale-105 transition-all">
            <User size={18} />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
