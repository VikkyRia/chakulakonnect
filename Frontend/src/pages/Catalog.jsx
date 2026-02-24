import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import {
    Search,
    Filter,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Star,
    ShoppingBag,
    Leaf,
    Loader2,
    SlidersHorizontal,
    ArrowUpDown,
    Check,
    X,
    Heart,
    Plus,
    Clock,
    Zap,
    Sparkles
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function Catalog() {
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        location: '',
        search: '',
        page: 1
    });
    const [sortBy, setSortBy] = useState('newest');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const categories = ['Vegetables', 'Fruits', 'Grains', 'Tubers', 'Protein', 'Dairy', 'Organic'];

    const fetchFoods = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                category: filters.category || '',
                minPrice: filters.minPrice || '',
                maxPrice: filters.maxPrice || '',
                location: filters.location || '',
                search: filters.search || '',
                page: filters.page || 1,
                limit: 12
            });
            const res = await api.get(`/api/foods?${params.toString()}`);
            if (res.data.success) {
                setFoods(res.data.data.foods);
                setPagination(res.data.data.pagination);
                setError(null);
            }
        } catch (err) {
            console.error('Failed to fetch foods:', err);
            setError("Could not connect to the fresh produce database. Please check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setUser(getCurrentUser());
        const timer = setTimeout(() => {
            fetchFoods();
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            setFilters(prev => ({ ...prev, page: newPage }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const resetFilters = () => {
        setFilters({
            category: '',
            minPrice: '',
            maxPrice: '',
            location: '',
            search: '',
            page: 1
        });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Transparent Frosty Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => navigate('/')}>
                        <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-100">
                            <img src={logo} alt="Logo" className="w-5 h-5 invert brightness-0" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900 hidden sm:block">
                            Chakula<span className="text-emerald-500">Konnect</span>
                        </span>
                    </div>

                    {/* Search Bar - Center */}
                    <div className="flex-1 max-w-2xl hidden md:block">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search fresh farm produce (e.g. Tomatoes, Yam)..."
                                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all outline-none font-medium text-slate-800"
                            />
                        </div>
                    </div>

                    {/* Auth/Actions */}
                    <div className="flex items-center gap-6 shrink-0">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate('/budget-helper')}
                                    className="hidden md:flex items-center gap-2 bg-slate-900 px-5 py-2.5 rounded-2xl text-white hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200"
                                >
                                    <Sparkles size={16} className="text-emerald-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">Recommend for me</span>
                                </button>
                                <button
                                    onClick={() => navigate(user.userType === 'seller' ? '/seller-dashboard' : '/consumer-dashboard')}
                                    className="flex items-center gap-3 bg-emerald-50 px-5 py-2.5 rounded-2xl border border-emerald-100 group hover:bg-emerald-500 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-xs group-hover:bg-white group-hover:text-emerald-500 transition-colors">
                                        {user.fullName?.[0]}
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-emerald-700 group-hover:text-white transition-colors hidden sm:block">Dashboard</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-sm font-black text-slate-500 hover:text-slate-900 uppercase tracking-widest transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-slate-900 text-white px-7 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 shadow-xl shadow-slate-200 hover:shadow-emerald-100 transition-all flex items-center gap-2 group active:scale-95"
                                >
                                    Get Started
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero / Filter Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded tracking-widest uppercase">Direct from Farm</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marketplace Catalog</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            {filters.category ? `The Finest ${filters.category}` : 'Explore Fresh Produce'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="pl-6 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 appearance-none outline-none focus:border-emerald-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                            <ArrowUpDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 shadow-sm"
                        >
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex gap-10">
                    {/* Sidebar Backdrop Mobile */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Modern Filter Sidebar */}
                    <aside className={`lg:w-72 fixed lg:sticky top-0 lg:top-32 h-screen lg:h-[calc(100vh-160px)] z-50 bg-white lg:bg-transparent transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] inset-y-0 left-0 p-8 lg:p-0 border-r border-slate-200 lg:border-none shadow-2xl lg:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="bg-white rounded-none lg:rounded-[2.5rem] p-8 shadow-sm border border-slate-200/60 h-full overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <SlidersHorizontal size={16} className="text-emerald-500" />
                                    Filters
                                </h3>
                                <div className="flex items-center gap-4">
                                    <button onClick={resetFilters} className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Reset</button>
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                    >
                                        <X size={20} className="text-slate-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {/* Categories */}
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Produce Category</label>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setFilters(prev => ({ ...prev, category: '', page: 1 }))}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-black transition-all ${!filters.category ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'text-slate-500 hover:bg-slate-50'}`}
                                        >
                                            All Fresh Items
                                            {!filters.category && <Check size={14} />}
                                        </button>
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setFilters(prev => ({ ...prev, category: cat, page: 1 }))}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-black transition-all ${filters.category === cat ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'text-slate-500 hover:bg-slate-50'}`}
                                            >
                                                {cat}
                                                {filters.category === cat && <Check size={14} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Budget (₦)</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">Min</span>
                                            <input
                                                type="number"
                                                name="minPrice"
                                                value={filters.minPrice}
                                                onChange={handleFilterChange}
                                                className="w-full pl-10 pr-3 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all"
                                            />
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">Max</span>
                                            <input
                                                type="number"
                                                name="maxPrice"
                                                value={filters.maxPrice}
                                                onChange={handleFilterChange}
                                                className="w-full pl-10 pr-3 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location Search */}
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Your Location</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="City or State..."
                                            value={filters.location}
                                            onChange={handleFilterChange}
                                            className="w-full pl-11 pr-3 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Availability Toggle Mockup */}
                                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-black text-slate-700">In Stock Only</span>
                                        <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                                            <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold leading-relaxed">Hide products that are currently unavailable or in high demand.</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Feed Grid */}
                    <div className="flex-1">
                        {error && (
                            <div className="mb-10 p-8 bg-rose-50 border border-rose-100 rounded-[2.5rem] flex flex-col items-center text-center gap-4 animate-shake">
                                <div className="w-14 h-14 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-100">
                                    <X size={28} strokeWidth={3} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-rose-900 uppercase tracking-widest mb-1">Market Connection Failed</h3>
                                    <p className="text-sm font-medium text-rose-600 max-w-md">{error}</p>
                                </div>
                                <button
                                    onClick={fetchFoods}
                                    className="mt-2 px-8 py-3 bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {loading && foods.length === 0 ? (
                            <div className="h-96 flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Fresh Harvest...</p>
                            </div>
                        ) : foods.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {foods.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-emerald-50 hover:-translate-y-2 transition-all duration-500 group overflow-hidden flex flex-col"
                                        >
                                            {/* Image Section */}
                                            <div className="h-64 relative overflow-hidden">
                                                <img
                                                    src={item.images[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e'}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute top-5 left-5">
                                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-emerald-600 shadow-xl border border-white/50 tracking-widest uppercase">
                                                        {item.status === 'surplus' ? 'Surplus Deal' : 'New Harvest'}
                                                    </span>
                                                </div>
                                                <button className="absolute top-5 right-5 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-slate-300 hover:text-rose-500 transition-colors">
                                                    <Heart size={18} />
                                                </button>

                                                <div className="absolute bottom-5 inset-x-5 flex justify-between items-end">
                                                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl border border-white/40">
                                                        <span className="text-xl font-black text-slate-900">₦{item.price}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 ml-1">/{item.unit}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info Section */}
                                            <div className="p-8 flex-1 flex flex-col">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="flex items-center gap-1 text-amber-400">
                                                        <Star size={14} fill="currentColor" />
                                                        <span className="text-xs font-black text-slate-900">4.9</span>
                                                    </div>
                                                    <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category}</span>
                                                </div>

                                                <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight group-hover:text-emerald-500 transition-colors">{item.name}</h3>
                                                <p className="text-slate-500 text-xs font-medium mb-6 line-clamp-2 leading-relaxed">
                                                    {item.description}
                                                </p>

                                                <div className="space-y-3 mb-8 pt-6 border-t border-slate-50">
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <MapPin size={14} className="text-emerald-400" />
                                                        <span className="text-[10px] font-black uppercase tracking-tight">{item.location.city}, {item.location.state}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <Zap size={14} className="text-amber-400" />
                                                        <span className="text-[10px] font-black uppercase tracking-tight">{item.quantity} {item.unit} in stock</span>
                                                    </div>
                                                </div>

                                                <div className="mt-auto flex items-center gap-3">
                                                    <div className="flex-1 flex items-center gap-3 bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                                                        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-extrabold text-[11px] shadow-sm">
                                                            {item.seller.fullName.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] font-black text-slate-900 truncate">{item.seller.fullName}</p>
                                                            <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Verified Farm</p>
                                                        </div>
                                                    </div>
                                                    <button className="h-14 w-14 bg-slate-900 hover:bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 hover:shadow-emerald-200 transition-all active:scale-90 relative overflow-hidden group/btn">
                                                        <Plus size={22} className="relative z-10" />
                                                        <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Premium Pagination */}
                                {pagination.pages > 1 && (
                                    <div className="mt-20 flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-3xl border border-slate-200/60 shadow-sm w-fit mx-auto">
                                        <button
                                            onClick={() => handlePageChange(pagination.page - 1)}
                                            disabled={pagination.page === 1}
                                            className="p-3 rounded-xl hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <div className="flex items-center gap-1">
                                            {[...Array(pagination.pages)].map((_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={`min-w-[40px] h-10 rounded-xl text-xs font-black transition-all ${pagination.page === i + 1 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                                                >
                                                    {String(i + 1).padStart(2, '0')}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => handlePageChange(pagination.page + 1)}
                                            disabled={pagination.page === pagination.pages}
                                            className="p-3 rounded-xl hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-[3rem] p-24 text-center border border-slate-200/60 shadow-sm max-w-2xl mx-auto flex flex-col items-center">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10 relative overflow-hidden">
                                    <Search className="text-slate-200 w-10 h-10" strokeWidth={1} />
                                    <div className="absolute inset-0 border-4 border-dashed border-slate-100 rounded-full animate-spin-slow"></div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight tracking-tight">Zero Results Found</h3>
                                <p className="text-slate-500 font-medium leading-relaxed mb-10 text-sm">We couldn't find any fresh produce matching your current filters. Try expanding your search area or selecting a different category.</p>
                                <button
                                    onClick={resetFilters}
                                    className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-3"
                                >
                                    <X size={16} />
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}

export default Catalog;
