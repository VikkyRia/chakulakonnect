import { useState } from 'react';
import {
    ShoppingCart,
    Clock,
    CheckCircle2,
    Truck,
    Search,
    Filter,
    ChevronRight,
    MoreHorizontal
} from 'lucide-react';

function OrderHub() {
    const [activeTab, setActiveTab] = useState('all');

    const orders = [
        { id: '#ORD-7241', customer: 'Sarah Johnson', item: 'Fresh Tomatoes', quantity: '10kg', total: '₦4,500', status: 'pending', date: '2 mins ago' },
        { id: '#ORD-7242', customer: 'Mike Peters', item: 'Organic Grains', quantity: '5kg', total: '₦3,200', status: 'shipped', date: '1 hour ago' },
        { id: '#ORD-7243', customer: 'Lagos Market', item: 'Red Onions', quantity: '50kg', total: '₦12,500', status: 'delivered', date: 'Yesterday' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-orange-100 text-orange-600 border-orange-200';
            case 'shipped': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'delivered': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return Clock;
            case 'shipped': return Truck;
            case 'delivered': return CheckCircle2;
            default: return Clock;
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50 shrink-0">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Order Hub</h2>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider">3 New</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find an order..."
                            className="bg-slate-100/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all w-48"
                        />
                    </div>
                </div>
            </header>

            <main className="flex-1 p-8 lg:p-12 max-w-7xl w-full mx-auto">
                <div className="flex items-center gap-2 mb-8 bg-slate-100/50 p-1.5 rounded-2xl w-fit">
                    {['all', 'pending', 'shipped', 'delivered'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {orders.filter(o => activeTab === 'all' || o.status === activeTab).map((order) => {
                        const Icon = getStatusIcon(order.status);
                        return (
                            <div key={order.id} className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:shadow-xl hover:border-emerald-100 transition-all group cursor-pointer">
                                <div className="flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${getStatusColor(order.status)} shrink-0`}>
                                            <Icon size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-black text-slate-900 tracking-tight">{order.item}</h3>
                                                <span className="text-[10px] font-black text-slate-400 font-mono">{order.id}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium">Customer: <span className="text-slate-900 font-bold">{order.customer}</span> • {order.quantity}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-12">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                                            <p className="text-lg font-black text-slate-900 leading-none">{order.total}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {orders.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                            <ShoppingCart size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">No orders yet</h3>
                        <p className="text-slate-400 font-medium">When consumers buy your produce, they'll appear here.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default OrderHub;
