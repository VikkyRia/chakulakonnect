import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated, logoutUser } from '../utils/auth';
import {
    LayoutDashboard,
    Box,
    ShoppingCart,
    BarChart3,
    Bell,
    Plus,
    ChevronRight,
    Search,
    LogOut,
    Settings,
    MoreHorizontal,
    Trash2,
    Eye,
    Edit3,
    Package,
    AlertCircle,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function MyListings() {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        fetchListings();
    }, [navigate]);

    const fetchListings = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/foods/seller/my-listings');
            if (res.data.success) {
                setListings(res.data.data.foods);
            }
        } catch (err) {
            console.error('Failed to fetch listings:', err);
            setError('Failed to load your listings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (foodId) => {
        if (!window.confirm('Are you sure you want to delete this listing?')) return;

        setDeletingId(foodId);
        try {
            const res = await api.delete(`/api/foods/${foodId}`);
            if (res.data.success) {
                setSuccessMessage('Listing deleted successfully');
                setListings(prev => prev.filter(item => item._id !== foodId));
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (err) {
            console.error('Delete failed:', err);
            alert(err.response?.data?.message || 'Failed to delete listing');
        } finally {
            setDeletingId(null);
        }
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Fetching your shop catalog...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-slate-200/60 sticky top-0 h-screen">
                <div className="p-8">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-100">
                            <img src={logo} alt="Logo" className="w-5 h-5 invert brightness-0" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900">
                            Chakula<span className="text-emerald-500">Konnect</span>
                        </span>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-2 mt-4">
                    {[
                        { icon: LayoutDashboard, label: 'Dashboard', onClick: () => navigate('/seller-dashboard') },
                        { icon: Box, label: 'My Listings', active: true },
                        { icon: ShoppingCart, label: 'Order Hub' },
                        { icon: BarChart3, label: 'Analytics' },
                        { icon: Bell, label: 'Market Alerts' },
                        { icon: Settings, label: 'Settings', onClick: () => navigate('/settings') }
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={item.onClick}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${item.active ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-4 mt-6 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-2xl transition-all"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Manage Inventory</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative group mr-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Filter items..."
                                className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all w-64"
                            />
                        </div>
                        <button
                            onClick={() => navigate('/add-product')}
                            className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 active:scale-95"
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Listing
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-8 lg:p-12 max-w-7xl w-full mx-auto">
                    {/* Success Message Toast */}
                    {successMessage && (
                        <div className="fixed top-24 right-8 z-[100] animate-in slide-in-from-right duration-300">
                            <div className="bg-white border-l-4 border-emerald-500 rounded-2xl p-6 shadow-2xl flex items-center gap-4">
                                <CheckCircle2 className="text-emerald-500" size={24} />
                                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{successMessage}</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-8 p-6 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-center gap-4 animate-shake">
                            <AlertCircle className="text-rose-500" size={24} />
                            <p className="text-rose-600 font-bold">{error}</p>
                        </div>
                    )}

                    <div className="mb-10">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Enterprise Inventory</span>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Active Listings</h1>
                        <p className="text-slate-500 font-medium mt-1">Manage your farm produce visibility and stock levels.</p>
                    </div>

                    <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-sm overflow-hidden">
                        {listings.length === 0 ? (
                            <div className="p-20 text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                    <Package size={40} />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-2">No Listings Found</h3>
                                <p className="text-slate-400 text-sm mb-8">You haven't added any products to your shop yet.</p>
                                <button
                                    onClick={() => navigate('/add-product')}
                                    className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest"
                                >
                                    Start Selling
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase tracking-widest font-black">
                                        <tr>
                                            <th className="px-8 py-6">Product</th>
                                            <th className="px-8 py-6">Category</th>
                                            <th className="px-8 py-6">Price</th>
                                            <th className="px-8 py-6">Stock</th>
                                            <th className="px-8 py-6 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {listings.map((item) => (
                                            <tr key={item._id} className="group hover:bg-slate-50/50 transition-all">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                                                            {item.images?.[0] ? (
                                                                <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                                    <Box size={20} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{item.name}</div>
                                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{item.location?.city}, {item.location?.state}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest italic border border-slate-200">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 font-black text-slate-900">
                                                    ₦{item.price.toLocaleString()}
                                                    <span className="text-[10px] text-slate-400 ml-1">/{item.unit}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className={`text-xs font-bold ${item.quantity < 5 ? 'text-rose-500' : 'text-slate-600'}`}>{item.quantity} {item.unit}</span>
                                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${item.quantity < 5 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                                                style={{ width: `${Math.min(100, (item.quantity / 50) * 100)}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-500 hover:border-emerald-200 transition-all shadow-sm">
                                                            <Edit3 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item._id)}
                                                            disabled={deletingId === item._id}
                                                            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm disabled:opacity-50"
                                                        >
                                                            {deletingId === item._id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MyListings;
