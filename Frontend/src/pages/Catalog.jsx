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
    Plus,
    Filter,
    ArrowRight,
    SearchX
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
    const [user] = useState(() => getCurrentUser());

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
        fetchFoods();
    }, [filters.category, filters.page]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFoods();
    };

    return (
        <div className="min-h-screen bg-slate-50/30">
            {/* Premium Header */}
            <header className="bg-white/90 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => navigate('/')}>
                        <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-100">
                            <img src={logo} alt="Logo" className="w-6 h-6 invert brightness-0" />
                        </div>
                        <span className="hidden sm:block text-xl font-black tracking-tight text-slate-900 italic">
                            Chakula<span className="text-emerald-500">Konnect</span>
                        </span>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-2xl relative group">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                placeholder="Search for fresh food..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white font-bold text-sm transition-all italic"
                            />
                        </form>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        {user ? (
                            <button
                                onClick={() => navigate(user.userType === 'seller' ? '/seller-dashboard' : '/consumer-dashboard')}
                                className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100 font-black text-sm transition-all active:scale-90"
                            >
                                {user.fullName?.[0]}
                            </button>
                        ) : (
                            <button onClick={() => navigate('/login')} className="text-xs font-black text-emerald-600 uppercase tracking-widest italic hover:underline">Login</button>
                        )}
                        <button className="p-3 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-2xl transition-all relative">
                            <ShoppingBag size={22} />
                            <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-lg">0</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Sub-header for Mobile Search */}
            <div className="md:hidden px-4 py-4 bg-white border-b border-slate-50">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        placeholder="Search products..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm italic"
                    />
                </form>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Visual Title */}
                <div className="mb-10 sm:mb-16">
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight italic">
                        {filters.category ? filters.category : "Local Marketplace"}
                    </h1>
                    <p className="text-slate-500 font-medium mt-3 italic text-lg">Exploring fresh produce from verified local farmers.</p>
                </div>

                {/* Simplified Category Selector */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-8 mb-12 snap-x">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 shrink-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilters({ ...filters, category: cat === 'All' ? '' : cat, page: 1 })}
                                className={`px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all italic snap-start ${(filters.category === cat || (cat === 'All' && !filters.category))
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 active:scale-95'
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Grid */}
                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-6">
                        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic animate-pulse">Scanning Fields...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                            {foods.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-[40px] border border-slate-100 hover:border-emerald-100 p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-50 flex flex-col active:scale-[0.98] cursor-pointer"
                                    onClick={() => navigate(`/foods/${item.id}`)}
                                >
                                    <div className="aspect-[4/3] relative rounded-[32px] overflow-hidden mb-6 bg-slate-50">
                                        <img
                                            src={item.images[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e'}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <button
                                            className="absolute bottom-4 right-4 w-11 h-11 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl flex items-center justify-center text-slate-900 hover:bg-emerald-600 hover:text-white transition-all active:scale-90"
                                            onClick={(e) => { e.stopPropagation(); /* Add to cart */ }}
                                        >
                                            <Plus size={22} strokeWidth={3} />
                                        </button>
                                        {item.status === 'surplus' && (
                                            <div className="absolute top-4 left-4 px-3 py-1.5 bg-rose-500 text-white text-[10px] font-black uppercase rounded-xl tracking-wider shadow-lg italic">Sale</div>
                                        )}
                                    </div>
                                    <div className="px-1 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="text-lg font-black text-slate-900 tracking-tight italic truncate group-hover:text-emerald-600 transition-colors">{item.name}</h3>
                                            <ArrowRight size={18} className="text-slate-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <div className="flex items-center gap-1.5 mb-6 text-slate-400">
                                            <MapPin size={12} className="text-emerald-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest italic truncate">{item.location?.city || "Ikeja, Lagos"}</span>
                                        </div>
                                        <div className="mt-auto flex items-end gap-1 pt-4 border-t border-slate-50">
                                            <span className="text-xl font-black text-slate-900 italic">₦{item.price}</span>
                                            <span className="text-xs font-bold text-slate-300 mb-1">/{item.unit || "kg"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="mt-20 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                                    disabled={filters.page === 1}
                                    className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                                        const pageNum = i + 1;
                                        const isCurrent = filters.page === pageNum;
                                        return (
                                            <button
                                                key={pageNum}
                                                className={`w-10 h-10 rounded-2xl font-black text-xs transition-all active:scale-90 ${isCurrent ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                                onClick={() => setFilters({ ...filters, page: pageNum })}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                                    disabled={filters.page === pagination.pages}
                                    className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}

                        {foods.length === 0 && !loading && (
                            <div className="py-32 flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center mb-8 border border-slate-50">
                                    <SearchX size={40} className="text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 italic mb-2">No produce found</h3>
                                <p className="text-slate-500 font-medium italic mb-8 max-w-xs">We couldn't find items matching your search or filters at the moment.</p>
                                <button
                                    onClick={() => setFilters({ ...filters, category: '', search: '', page: 1 })}
                                    className="px-8 py-3.5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 text-xs uppercase tracking-widest"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default Catalog;
