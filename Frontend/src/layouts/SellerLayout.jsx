import { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Box,
    ShoppingCart,
    Sparkles,
    Bell,
    Settings,
    LogOut
} from 'lucide-react';
import logo from '../assets/image/SVG.png';
import { isAuthenticated, logoutUser } from '../utils/auth';

function SellerLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/seller-dashboard' },
        { icon: Box, label: 'My Listings', path: '/seller-dashboard/list' },
        { icon: ShoppingCart, label: 'Order Hub', path: '/seller-dashboard/orders' },
        { icon: Sparkles, label: 'AI Forecast', path: '/seller-dashboard/forecast' },
        { icon: Bell, label: 'Market Alerts', path: '/seller-dashboard/alerts' },
        { icon: Settings, label: 'Settings', path: '/seller-dashboard/settings' }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-slate-200/60 sticky top-0 h-screen">
                <div className="p-8">
                    <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-100">
                            <img src={logo} alt="Logo" className="w-5 h-5 invert brightness-0" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900">
                            Chakula<span className="text-emerald-500">Konnect</span>
                        </span>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-2 mt-4">
                    {navItems.map((item, idx) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={idx}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                {item.label}
                            </button>
                        );
                    })}
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

            {/* Mobile Sidebar (optional/minimal for now) */}
            <div className="lg:hidden bg-white border-b border-slate-200/60 p-4 flex justify-between items-center sticky top-0 z-[60]">
                <div className="flex items-center gap-2" onClick={() => navigate('/')}>
                    <img src={logo} alt="Logo" className="w-6 h-6" />
                    <span className="font-black text-slate-900">Chakula<span className="text-emerald-500">Konnect</span></span>
                </div>
                <button className="p-2 bg-slate-50 rounded-lg text-slate-400">
                    <LayoutDashboard size={20} />
                </button>
            </div>

            {/* Content Outlet */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}

export default SellerLayout;
