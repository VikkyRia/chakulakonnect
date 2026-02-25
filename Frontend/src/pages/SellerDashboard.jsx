import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated, getCurrentUser, logoutUser } from '../utils/auth';
import {
    LayoutDashboard,
    Box,
    ShoppingCart,
    BarChart3,
    Bell,
    Plus,
    TrendingUp,
    DollarSign,
    Package,
    Leaf,
    ChevronRight,
    TrendingDown,
    Sparkles,
    MapPin,
    LogOut,
    User,
    Search,
    Clock,
    ArrowUpRight,
    Settings,
    MoreHorizontal,
    Zap
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function SellerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalListings: 0,
        availableListings: 0,
        outOfStockListings: 0,
        surplusListings: 0,
        totalQuantity: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch real profile from backend
                const profileRes = await api.get('/api/users/me');
                if (profileRes.data.success) {
                    const userData = profileRes.data.data.user;
                    setUser(userData);
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                } else {
                    const currentUser = getCurrentUser();
                    setUser(currentUser || { fullName: 'Musa Ibrahim', userType: 'seller' });
                }

                const response = await api.get('/api/foods/seller/my-listings');
                if (response.data.success) {
                    setStats(response.data.data.stats);
                }
            } catch (error) {
                console.error("Error fetching seller data:", error);
                const currentUser = getCurrentUser();
                setUser(currentUser || { fullName: 'Musa Ibrahim', userType: 'seller' });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Initializing Seller Hub...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Listings', value: stats.totalListings, change: '+12%', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'In Stock', value: stats.availableListings, change: 'Optimal', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Surplus Stock', value: stats.surplusListings, change: 'Urgent', icon: Leaf, color: 'text-orange-600', bg: 'bg-orange-50' },
        { title: 'Total Sales', value: '₦142K', change: '+24%', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    const recentOrders = [
        { id: '#ORD-2841', product: 'Fresh Tomatoes', quantity: '50 kg', status: 'Delivered', date: 'Oct 24, 2023', statusColor: 'bg-emerald-100 text-emerald-700' },
        { id: '#ORD-2845', product: 'Sweet Potatoes', quantity: '120 kg', status: 'Shipped', date: 'Oct 25, 2023', statusColor: 'bg-blue-100 text-blue-700' },
        { id: '#ORD-2848', product: 'Red Onions', quantity: '200 kg', status: 'Pending', date: 'Oct 25, 2023', statusColor: 'bg-orange-100 text-orange-700' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
            {/* Sidebar - Same as Consumer for Consistency */}
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
                        { icon: LayoutDashboard, label: 'Dashboard', active: true },
                        { icon: Box, label: 'My Listings', onClick: () => navigate('/my-listings') },
                        { icon: ShoppingCart, label: 'Order Hub' },
                        { icon: Sparkles, label: 'AI Forecast', onClick: () => navigate('/sales-forecast') },
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
                    <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Seller Pro</h4>
                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed mb-4">You have 3 items reaching surplus status soon.</p>
                        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black transition-all">Optimize Price</button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-4 mt-6 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-2xl transition-all"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <div className="lg:hidden bg-emerald-500 p-1.5 rounded-lg mr-2">
                            <img src={logo} alt="Logo" className="w-5 h-5 invert brightness-0" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Seller Overview</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative group mr-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search orders, items..."
                                className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all w-64"
                            />
                        </div>
                        <button
                            onClick={() => navigate('/add-product')}
                            className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 active:scale-95"
                        >
                            <Plus size={18} strokeWidth={3} />
                            Add Item
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-8 lg:p-12 max-w-7xl w-full mx-auto">
                    {/* Welcome */}
                    <div className="mb-12">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Enterprise Seller Terminal</span>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, {user?.fullName?.split(' ')[0]}!</h1>
                        <p className="text-slate-500 font-medium mt-1">Your farm-to-table activity is looking strong today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {statCards.map((stat, idx) => (
                            <div key={idx} className="bg-white p-7 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-emerald-50 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <stat.icon size={22} />
                                    </div>
                                    <div className="text-[10px] font-black px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-full shadow-sm">
                                        {stat.change}
                                    </div>
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                        {/* Orders Section */}
                        <div className="xl:col-span-8 bg-white rounded-[3rem] border border-slate-200/60 shadow-sm p-8 md:p-10">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Activity</h2>
                                <button className="text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    Full Report <ChevronRight size={14} strokeWidth={3} />
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-separate border-spacing-y-4">
                                    <thead>
                                        <tr className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                                            <th className="px-4 pb-2">Order Tracking</th>
                                            <th className="px-4 pb-2">Produce Item</th>
                                            <th className="px-4 pb-2">Volume</th>
                                            <th className="px-4 pb-2 text-center">Lifecycle</th>
                                            <th className="px-4 pb-2">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order, idx) => (
                                            <tr key={idx} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                                                <td className="px-4 py-5 bg-white border-y border-l border-slate-100/60 rounded-l-2xl font-black text-sm text-slate-900 group-hover:border-emerald-100">{order.id}</td>
                                                <td className="px-4 py-5 bg-white border-y border-slate-100/60 text-sm font-bold text-slate-600 group-hover:border-emerald-100">{order.product}</td>
                                                <td className="px-4 py-5 bg-white border-y border-slate-100/60 text-sm text-slate-500 font-bold group-hover:border-emerald-100">{order.quantity}</td>
                                                <td className="px-4 py-5 bg-white border-y border-slate-100/60 text-center group-hover:border-emerald-100">
                                                    <span className={`inline-block px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border border-current/20 ${order.statusColor}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-5 bg-white border-y border-r border-slate-100/60 rounded-r-2xl text-xs text-slate-400 font-black group-hover:border-emerald-100">
                                                    {order.date}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Side Panels */}
                        <div className="xl:col-span-4 space-y-8">
                            {/* AI Insights - Redesigned */}
                            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 scale-150"></div>

                                <div className="flex items-center gap-3 mb-10 relative z-10">
                                    <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md">
                                        <Sparkles size={20} className="text-emerald-400 animate-pulse" />
                                    </div>
                                    <h2 className="text-xl font-black tracking-tight">AI Market Radar</h2>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-2 text-emerald-400 mb-3 uppercase text-[10px] font-black tracking-widest">
                                            <TrendingUp size={14} strokeWidth={3} />
                                            Opportunity Found
                                        </div>
                                        <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                            Demand for <span className="text-white font-black underline decoration-emerald-500 underline-offset-4">Organic Tomatoes</span> is spiking. Increase supply for <span className="text-emerald-400 font-black">+15% margins</span>.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-2 text-orange-400 mb-3 uppercase text-[10px] font-black tracking-widest">
                                            <Clock size={14} strokeWidth={3} />
                                            Pricing Alert
                                        </div>
                                        <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                            Competitor prices for Grains dropped. Consider a <span className="text-orange-400 font-black">Limited Surplus Sale</span> today.
                                        </p>
                                    </div>

                                    <button className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-900/40 transition-all active:scale-95 flex items-center justify-center gap-2">
                                        View Strategy Board
                                        <ArrowUpRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Demand Map Card - Consistent with Home */}
                            <div className="bg-white rounded-[3rem] p-10 border border-slate-200/60 shadow-sm overflow-hidden group">
                                <h2 className="text-lg font-black mb-8 text-slate-900 tracking-tight">Active Demand Hotspots</h2>
                                <div className="relative h-56 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 overflow-hidden cursor-pointer shadow-inner">
                                    <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                                    {/* Abstract Heatmap Circles */}
                                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-600 rounded-full blur-[80px] opacity-30"></div>

                                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl border border-white shadow-2xl group-hover:-translate-y-2 transition-transform duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
                                                <MapPin size={18} fill="currentColor" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">Ikeja Central</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">High Surplus Demand</p>
                                            </div>
                                        </div>
                                        <div className="bg-emerald-500/10 text-emerald-600 p-2 rounded-lg">
                                            <ArrowUpRight size={16} strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SellerDashboard;
