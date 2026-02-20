import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Search
} from 'lucide-react';
import logo from '../assets/image/SVG.png';

function SellerDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('currentUser') || '{"fullName": "Musa Ibrahim", "userType": "seller"}');
    const [activeTab, setActiveTab] = useState('Dashboard');

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Inventory', icon: Box },
        { name: 'Orders', icon: ShoppingCart },
        { name: 'Analytics', icon: BarChart3 },
        { name: 'Market Alerts', icon: Bell },
    ];

    const statCards = [
        { title: 'Total Sales', value: '₦458,200', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Total Orders', value: '124', change: '+8', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Demand Score', value: '88/100', change: 'High', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
        { title: 'Waste Saved', value: '1.2 Tons', change: 'Impact', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    ];

    const recentOrders = [
        { id: '#ORD-2841', product: 'Fresh Tomatoes', quantity: '50 kg', status: 'Delivered', date: 'Oct 24, 2023', statusColor: 'bg-green-100 text-green-700' },
        { id: '#ORD-2845', product: 'Sweet Potatoes', quantity: '120 kg', status: 'Shipped', date: 'Oct 25, 2023', statusColor: 'bg-blue-100 text-blue-700' },
        { id: '#ORD-2848', product: 'Red Onions', quantity: '200 kg', status: 'Pending', date: 'Oct 25, 2023', statusColor: 'bg-orange-100 text-orange-700' },
    ];

    return (
        <div className="flex min-h-screen bg-[#F9FAFB] text-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 hidden lg:flex">
                <div className="p-8 flex items-center gap-3">
                    <div className="bg-[#22C55E] p-1.5 rounded-lg shadow-sm">
                        <img src={logo} alt="Logo" className="w-5 h-5 invert brightness-0" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-800">
                        Chakula<span className="text-[#22C55E]">Konnect</span>
                    </span>
                </div>

                <nav className="flex-1 px-4 mt-2 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${activeTab === item.name
                                ? 'bg-[#22C55E] text-white shadow-xl shadow-green-100'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.name ? 'text-white' : 'text-gray-400 group-hover:text-[#22C55E]'} />
                            <span className="font-semibold text-sm">{item.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="bg-gray-50 rounded-[24px] p-4 flex items-center gap-3 border border-gray-100 hover:border-green-200 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-extrabold shadow-sm">
                            {user.fullName?.split(' ').map(n => n[0]).join('') || 'MI'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold text-gray-900 truncate">{user.fullName}</p>
                            <p className="text-[11px] text-gray-500 font-medium truncate">Standard Seller</p>
                        </div>
                        <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Mobile/Small Header */}
                <header className="lg:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-6 h-6" />
                        <span className="font-bold text-lg">Chakula<span className="text-green-600">Konnect</span></span>
                    </div>
                    <button className="p-2 bg-gray-50 rounded-lg text-gray-600">
                        <LayoutDashboard size={20} />
                    </button>
                </header>

                <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                    {/* Header with Breadcrumb & Actions */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <div className="inline-flex items-center px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[9px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                Seller dashboard
                            </div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                Welcome back, {user.fullName?.split(' ')[0]}!
                            </h1>
                            <p className="text-gray-500 mt-1.5 font-medium">Here's what's happening with your farm today.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-6 py-3 rounded-2xl border border-gray-200 font-bold text-sm text-gray-700 hover:bg-white hover:shadow-md transition-all flex items-center gap-2 bg-white/50 backdrop-blur-sm">
                                <Leaf size={18} className="text-green-500" />
                                Mark Surplus
                            </button>
                            <button className="px-6 py-3 rounded-2xl bg-[#22C55E] text-white font-bold text-sm hover:bg-green-600 shadow-xl shadow-green-100 transition-all flex items-center gap-2 active:scale-95">
                                <Plus size={20} />
                                Add Product
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                        {statCards.map((card, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 flex flex-col relative group hover:shadow-xl hover:border-green-50 transition-all duration-300">
                                <div className="flex items-center justify-between mb-5">
                                    <div className={`${card.bg} ${card.color} p-3.5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                                        <card.icon size={22} />
                                    </div>
                                    <div className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${card.change.includes('+') ? 'bg-green-50 text-green-600' :
                                        card.change === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {card.change}
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">{card.title}</p>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{card.value}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Recent Orders Table Panel */}
                        <div className="xl:col-span-2 bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-xl font-black text-gray-800">Recent Orders</h2>
                                <button className="text-[#22C55E] text-sm font-extrabold hover:underline flex items-center gap-1 group">
                                    View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-separate border-spacing-y-2">
                                    <thead>
                                        <tr className="text-[11px] text-gray-400 uppercase tracking-widest font-black">
                                            <th className="px-4 py-2 font-black">Order ID</th>
                                            <th className="px-4 py-2 font-black">Product</th>
                                            <th className="px-4 py-2 font-black">Quantity</th>
                                            <th className="px-4 py-2 font-black text-center">Status</th>
                                            <th className="px-4 py-2 font-black">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order, idx) => (
                                            <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-5 font-bold text-sm text-gray-900 border-t border-gray-50">{order.id}</td>
                                                <td className="px-4 py-5 text-sm font-bold text-gray-700 border-t border-gray-50">{order.product}</td>
                                                <td className="px-4 py-5 text-sm text-gray-500 font-bold border-t border-gray-50">{order.quantity}</td>
                                                <td className="px-4 py-5 text-center border-t border-gray-50">
                                                    <span className={`inline-block px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${order.statusColor}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-5 text-sm text-gray-400 font-bold border-t border-gray-50">{order.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Insights Column */}
                        <div className="flex flex-col gap-8">
                            {/* AI Market Insights Card */}
                            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-[60px] -mr-10 -mt-10 opacity-60"></div>

                                <div className="flex items-center gap-3 mb-8 text-[#22C55E] relative">
                                    <div className="bg-green-50 p-2 rounded-xl">
                                        <Sparkles size={20} className="animate-pulse" />
                                    </div>
                                    <h2 className="text-lg font-black text-gray-800 tracking-tight">AI Market Insights</h2>
                                </div>

                                <div className="space-y-5 relative">
                                    <div className="p-5 bg-orange-50/60 rounded-[28px] border border-orange-100 border-l-[6px] border-l-orange-400 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 text-orange-700 mb-2.5 uppercase text-[10px] font-black tracking-widest">
                                            <Bell size={13} fill="currentColor" />
                                            High Demand Alert
                                        </div>
                                        <p className="text-xs text-gray-800 font-bold font-medium leading-[1.6]">
                                            Demand for <span className="text-orange-800 font-black px-1.5 py-0.5 bg-orange-100 rounded">Fresh Tomatoes</span> is expected to rise by <span className="text-orange-600">40% next week</span>.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-green-50/60 rounded-[28px] border border-green-100 border-l-[6px] border-l-green-400 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-2 text-green-700 mb-2.5 uppercase text-[10px] font-black tracking-widest">
                                            <TrendingDown size={13} strokeWidth={3} />
                                            Price Prediction
                                        </div>
                                        <p className="text-xs text-gray-800 font-bold font-medium leading-[1.6]">
                                            A slight price dip predicted for <span className="text-green-800 font-black px-1.5 py-0.5 bg-green-100 rounded">Cabbage</span>. List surplus stock now.
                                        </p>
                                    </div>

                                    <button className="w-full mt-2 py-4 rounded-2xl border border-gray-100 text-[#22C55E] text-xs font-black shadow-sm bg-white hover:bg-[#22C55E] hover:text-white transition-all duration-300 transform active:scale-[0.98]">
                                        Explore Detailed Forecasts
                                    </button>
                                </div>
                            </div>

                            {/* Hotspots Map Card */}
                            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col">
                                <h2 className="text-lg font-black mb-6 text-gray-800 tracking-tight px-1">Nearby Demand Hotspots</h2>
                                <div className="relative h-48 bg-emerald-50 rounded-[32px] overflow-hidden border border-emerald-100 group cursor-pointer shadow-inner">
                                    {/* Visual Representation of Map */}
                                    <div className="absolute inset-0 opacity-30 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
                                        {/* Abstract Map Circles */}
                                        <div className="absolute top-8 left-12 w-24 h-24 bg-green-400 rounded-full blur-2xl animate-pulse"></div>
                                        <div className="absolute bottom-6 right-8 w-32 h-32 bg-green-500 rounded-full blur-3xl opacity-60"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-300 rounded-full blur-[80px] opacity-40"></div>

                                        {/* Grid pattern overlay */}
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                    </div>

                                    {/* Market Tag UI */}
                                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-white/95 backdrop-blur-md px-4 py-3.5 rounded-2xl border border-white shadow-xl transform group-hover:translate-y-[-4px] transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-green-100 rounded-lg">
                                                <MapPin size={16} className="text-green-600" fill="currentColor" />
                                            </div>
                                            <span className="text-[12px] font-black text-gray-800">Lagos Central Market</span>
                                        </div>
                                        <span className="text-[10px] font-black text-white bg-[#22C55E] px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-md">
                                            Very High
                                        </span>
                                    </div>

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20%] w-full animate-scan pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(500%); }
                }
                .animate-scan {
                    animation: scan 3s linear infinite;
                }
                body {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }
            `}} />
        </div>
    );
}

export default SellerDashboard;
