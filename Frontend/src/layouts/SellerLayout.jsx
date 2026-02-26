import { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Box,
    ShoppingCart,
    Sparkles,
    Bell,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import logo from '../assets/image/SVG.png';
import { isAuthenticated, logoutUser, getCurrentUser } from '../utils/auth';

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/seller-dashboard' },
    { icon: Box, label: 'My Listings', path: '/seller-dashboard/list' },
    { icon: ShoppingCart, label: 'Order Hub', path: '/seller-dashboard/orders' },
    { icon: Sparkles, label: 'AI Forecast', path: '/seller-dashboard/forecast' },
    { icon: Bell, label: 'Market Alerts', path: '/seller-dashboard/alerts' },
    { icon: Settings, label: 'Settings', path: '/seller-dashboard/settings' }
];

const SidebarContent = ({ navigate, location, handleLogout }) => (
    <>
        <div className="p-8">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
                <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-100">
                    <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                    Chakula<span className="text-emerald-500">Konnect</span>
                </span>
            </div>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-4">
            {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path || (item.path === '/seller-dashboard' && location.pathname === '/seller-dashboard/overview');
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

        <div className="p-6 mt-auto">
            <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group mb-6">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Seller Pro</h4>
                <p className="text-[11px] font-medium text-slate-400 leading-relaxed mb-4">You have items reaching surplus status soon.</p>
                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black transition-all">Optimize Price</button>
            </div>

            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-4 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-2xl transition-all"
            >
                <LogOut size={20} />
                Sign Out
            </button>
        </div>
    </>
);

function SellerLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [user] = useState(() => getCurrentUser());

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        setLoading(false);
    }, [navigate]);

    // Close sidebar on route change
    useEffect(() => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    }, [location.pathname, isSidebarOpen]);

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


    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row relative">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-slate-200/60 sticky top-0 h-screen">
                <SidebarContent navigate={navigate} location={location} handleLogout={handleLogout} />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-[80] lg:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute top-6 right-6 lg:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-900"
                    >
                        <X size={20} />
                    </button>
                </div>
                <SidebarContent navigate={navigate} location={location} handleLogout={handleLogout} />
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-slate-200/60 p-4 flex justify-between items-center sticky top-0 z-[60]">
                <div className="flex items-center gap-2" onClick={() => navigate('/')}>
                    <img src={logo} alt="Logo" className="w-7 h-7" />
                    <span className="font-black text-slate-900 text-lg">Chakula<span className="text-emerald-500">Konnect</span></span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2.5 bg-slate-50 text-slate-600 rounded-xl active:scale-90 transition-all"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* Content Outlet */}
            <div className="flex-1 flex flex-col overflow-x-hidden">
                <Outlet />
            </div>
        </div>
    );
}

export default SellerLayout;
