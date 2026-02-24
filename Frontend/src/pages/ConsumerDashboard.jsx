import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated, getCurrentUser, logoutUser } from '../utils/auth';
import {
    ShoppingBag,
    History,
    Heart,
    MapPin,
    LogOut,
    Search,
    ChevronRight,
    Star,
    Leaf,
    Calendar,
    Bell,
    Settings,
    LayoutDashboard,
    ArrowUpRight,
    Wallet,
    X,
    Sparkles
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function ConsumerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showWelcome, setShowWelcome] = useState(false);
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/users/me');
                if (res.data.success) {
                    const userData = res.data.data.user;
                    setUser(userData);
                    localStorage.setItem('currentUser', JSON.stringify(userData));

                    setShowWelcome(true);
                    setTimeout(() => setShowWelcome(false), 5000);
                }
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                const localUser = getCurrentUser();
                if (localUser) {
                    setUser(localUser);
                } else {
                    setUser({ fullName: 'Joy Adama', userType: 'consumer' });
                    setError("Session data missing. Showing demo content.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-green-100 border-t-green-500 rounded-full animate-spin"></div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Your Pantry...</p>
                </div>
            </div>
        );
    }

    const stats = [
        { label: 'Total Orders', value: '24', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Amount Spent', value: '₦42,500', icon: Wallet, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Food Saved', value: '18kg', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Rewards', value: '850', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    const recentItems = [
        { name: 'Organic Red Tomatoes', farm: 'Green Valley Farm', price: '2,500', unit: 'crate', image: 'https://images.unsplash.com/photo-1546473422-292451f2e5a6' },
        { name: 'Fresh Watermelon', farm: 'Sunshine Orchards', price: '1,200', unit: 'piece', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38' },
        { name: 'Leafy Spinach', farm: 'EcoGrowth Farms', price: '450', unit: 'bunch', image: 'https://images.unsplash.com/photo-1523413555809-0fb86ca0451d' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
            {/* Left Sidebar - Desktop */}
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
                        { icon: ShoppingBag, label: 'Marketplace', onClick: () => navigate('/categories') },
                        { icon: Sparkles, label: 'AI Budget Helper', onClick: () => navigate('/budget-helper') },
                        { icon: History, label: 'Order History' },
                        { icon: Heart, label: 'Favorites' },
                        { icon: MapPin, label: 'Track Orders' },
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
                        <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-2">Pro Member</h4>
                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed mb-4">You saved ₦12,000 this month with direct farm deals!</p>
                        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black transition-all">View Savings</button>
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

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-slate-200/60 p-5 flex items-center justify-between sticky top-0 z-50">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-6 h-6" />
                        <span className="font-black text-slate-900">Chakula<span className="text-emerald-500">Konnect</span></span>
                    </div>
                    <button className="p-2.5 bg-slate-50 rounded-xl text-slate-500"><Bell size={20} /></button>
                </header>

                <main className="flex-1 p-6 lg:p-12 max-w-7xl">
                    {/* Welcome Overlay Toast */}
                    {showWelcome && (
                        <div className="fixed top-24 right-8 z-[100] animate-bounce-subtle">
                            <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-2xl flex items-center gap-4 transition-all hover:scale-105">
                                <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
                                    <Bell size={24} className="animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-900">Welcome Back, {user?.fullName?.split(' ')[0]}!</h4>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Your account is ready for fresh deals</p>
                                </div>
                                <button onClick={() => setShowWelcome(false)} className="ml-4 p-1 hover:bg-slate-100 rounded-lg"><X size={16} className="text-slate-400" /></button>
                            </div>
                        </div>
                    )}

                    {/* Error Display - Addressing "cunsumer error not showing anything" */}
                    {error && (
                        <div className="mb-8 p-6 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-center justify-between gap-6 animate-shake">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-rose-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-rose-100">
                                    <Bell size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-rose-900 uppercase tracking-widest">Dashboard Error</h3>
                                    <p className="text-xs font-medium text-rose-600 leading-relaxed">{error}</p>
                                </div>
                            </div>
                            <button onClick={() => setError(null)} className="px-5 py-2.5 bg-white border border-rose-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500 hover:text-white transition-all">Dismiss</button>
                        </div>
                    )}

                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Premium Consumer Account</span>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                Hello, {user?.fullName?.split(' ')[0]}! 👋
                            </h1>
                            <p className="text-slate-500 font-medium mt-1">Ready to grab some fresh farm deals today?</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex flex-col items-end mr-2">
                                <span className="text-xs font-black text-slate-900">{user?.fullName}</span>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Verified Buyer</span>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xl border-4 border-white shadow-xl">
                                {user?.fullName?.[0]}
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-emerald-50 hover:-translate-y-1 transition-all duration-300 group">
                                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={22} />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                        {/* Main Interaction Column */}
                        <div className="xl:col-span-8 space-y-10">
                            {/* Promo Banner */}
                            <div className="bg-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group cursor-pointer shadow-2xl shadow-emerald-200/50">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-1000 group-hover:scale-110"></div>
                                <div className="relative z-10 max-w-md">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
                                        <ArrowUpRight size={12} />
                                        Limited Time Deal
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">Fresh harvest is arriving now!</h2>
                                    <p className="text-emerald-100 font-medium mb-8 leading-relaxed opacity-90">Get up to 40% discount on all surplus tubers and grains directly from Northern farms.</p>
                                    <button
                                        onClick={() => navigate('/categories')}
                                        className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Browse Marketplace
                                    </button>
                                </div>
                                <div className="absolute bottom-0 right-0 hidden md:block select-none pointer-events-none translate-y-2 translate-x-4 opacity-20 scale-150 rotate-12">
                                    <Leaf size={240} strokeWidth={1} />
                                </div>
                            </div>

                            {/* Recommendations Section */}
                            <div>
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
                                            <Calendar size={18} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Picked for You</h2>
                                    </div>
                                    <button className="text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                                        View All Deals <ChevronRight size={14} strokeWidth={3} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recentItems.map((item, idx) => (
                                        <div key={idx} className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-2xl hover:border-emerald-50 transition-all duration-500 group">
                                            <div className="h-48 relative overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur rounded-full text-[10px] font-black text-slate-900 shadow-xl">
                                                    <Star size={10} className="text-amber-400 fill-amber-400" />
                                                    4.9
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{item.farm}</p>
                                                <h4 className="font-black text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">{item.name}</h4>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-lg font-black text-slate-900">₦{item.price}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold ml-1">/ {item.unit}</span>
                                                    </div>
                                                    <button className="p-3 bg-slate-50 hover:bg-emerald-500 text-slate-400 hover:text-white rounded-xl transition-all shadow-sm">
                                                        <Plus size={18} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="xl:col-span-4 space-y-8">
                            {/* Pickup Locations Map Mockup */}
                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm">
                                <h3 className="text-lg font-black text-slate-900 mb-6 tracking-tight">Active Deliveries</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-100 transition-colors">
                                            <MapPin size={22} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-black text-slate-900">In Transit</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">1.2km from you</p>
                                        </div>
                                        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
                                    </div>
                                    <div className="h-40 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100 flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-1000" style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                                        <div className="text-center relative z-10">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                                                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
                                            </div>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live Tracking</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Healthy Tips */}
                            <div className="bg-emerald-50/50 rounded-[2.5rem] p-8 border border-emerald-100/50">
                                <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
                                    <Leaf size={22} />
                                </div>
                                <h3 className="text-lg font-black text-emerald-900 mb-3 tracking-tight">Eco Impact</h3>
                                <p className="text-[13px] font-medium text-emerald-700 leading-relaxed mb-6">
                                    By purchasing through ChakulaKonnect, you've helped reduce farm waste by <span className="font-black underlineDecoration-emerald-400 underline underline-offset-4">12% this week</span>.
                                </p>
                                <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline">See Detailed Impact</button>
                            </div>

                            {/* Quick Support */}
                            <div className="flex items-center justify-between p-6 bg-slate-900 rounded-[2rem] text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                        <Bell size={18} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Help Center</p>
                                        <p className="text-xs font-bold">24/7 Support</p>
                                    </div>
                                </div>
                                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ConsumerDashboard;
