import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import {
    Search,
    MapPin,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
    Loader2,
    X,
    Plus,
    Filter
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function Catalog() {
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
    const [filters, setFilters] = useState({
        category: '',
        search: '',
        page: 1
    });
    const [user, setUser] = useState(null);

    const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Tubers', 'Protein', 'Dairy'];

    const fetchFoods = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                category: filters.category === 'All' ? '' : filters.category,
                search: filters.search || '',
                page: filters.page || 1,
                limit: 12
            });
            const res = await api.get(`/api/foods?${params.toString()}`);
            if (res.data.success) {
                setFoods(res.data.data.foods);
                setPagination(res.data.data.pagination);
            }
        } catch (err) {
            console.error('Failed to fetch foods:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setUser(getCurrentUser());
        fetchFoods();
    }, [filters.category, filters.page]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFoods();
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Simple Clean Header */}
            <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img src={logo} alt="Logo" className="w-6 h-6" />
                        <span className="text-lg font-bold text-slate-900 tracking-tight">Marketplace</span>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                placeholder="Search products..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all"
                            />
                        </form>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <button
                                onClick={() => navigate(user.userType === 'seller' ? '/seller-dashboard' : '/consumer-dashboard')}
                                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-emerald-500 hover:text-white transition-colors"
                            >
                                {user.fullName?.[0]}
                            </button>
                        ) : (
                            <button onClick={() => navigate('/login')} className="text-sm font-bold text-emerald-600">Login</button>
                        )}
                        <button className="relative p-2 text-slate-600 hover:text-emerald-500 transition-colors">
                            <ShoppingBag size={22} />
                            <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">0</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Sub-header for Mobile Search */}
            <div className="md:hidden px-6 py-4 border-b border-slate-100">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        placeholder="Search products..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none"
                    />
                </form>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Simplified Category Selector */}
                <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-hide">
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl shrink-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilters({ ...filters, category: cat === 'All' ? '' : cat, page: 1 })}
                                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${(filters.category === cat || (cat === 'All' && !filters.category))
                                        ? 'bg-white text-emerald-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Grid */}
                {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-emerald-500" size={32} />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                            {foods.map((item) => (
                                <div key={item.id} className="group border border-transparent hover:border-slate-100 rounded-2xl p-2 transition-all">
                                    <div className="aspect-square relative rounded-xl overflow-hidden mb-4 bg-slate-50">
                                        <img
                                            src={item.images[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e'}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur shadow-sm rounded-lg flex items-center justify-center text-slate-900 hover:bg-emerald-500 hover:text-white transition-all active:scale-90">
                                            <Plus size={18} />
                                        </button>
                                        {item.status === 'surplus' && (
                                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-rose-500 text-white text-[9px] font-black uppercase rounded tracking-tighter">Sale</div>
                                        )}
                                    </div>
                                    <div className="px-1">
                                        <h3 className="text-sm font-bold text-slate-900 mb-0.5 truncate">{item.name}</h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin size={10} className="text-emerald-500" />
                                            <span className="text-[10px] font-medium text-slate-500">{item.location?.city}</span>
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm font-black text-slate-900">₦{item.price}</span>
                                            <span className="text-[10px] font-bold text-slate-400">/{item.unit}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Simplified Pagination */}
                        {pagination.pages > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                                    disabled={filters.page === 1}
                                    className="p-2 border border-slate-100 rounded-lg disabled:opacity-30 hover:bg-slate-50 transition-colors"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="text-xs font-bold text-slate-600 px-4">Page {filters.page} of {pagination.pages}</span>
                                <button
                                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                                    disabled={filters.page === pagination.pages}
                                    className="p-2 border border-slate-100 rounded-lg disabled:opacity-30 hover:bg-slate-50 transition-colors"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}

                        {foods.length === 0 && !loading && (
                            <div className="py-20 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                                    <Search size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">No items found</h3>
                                <p className="text-xs font-medium text-slate-400 mt-1">Try a different search term or category.</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default Catalog;
