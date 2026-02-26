import { History, ShoppingBag, ChevronRight, Package, Clock } from 'lucide-react';

function OrderHistory() {
    const orders = [
        { id: '#CK-9281', vendor: 'Ibadan Fresh Farms', items: 'Tomatoes, Onions', total: '₦4,500', status: 'Delivered', date: 'Oct 24, 2023' },
        { id: '#CK-9285', vendor: 'Lagos Urban Garden', items: 'Lettuce, Spinach', total: '₦2,800', status: 'In Transit', date: 'Oct 25, 2023' },
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50 shrink-0">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Purchase History</h2>
            </header>

            <main className="flex-1 p-8 lg:p-12 max-w-5xl w-full mx-auto">
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 hover:shadow-xl transition-all group cursor-pointer">
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                        <Package size={28} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-black text-slate-900 text-lg tracking-tight">{order.vendor}</h3>
                                            <span className="text-[10px] font-black text-slate-400 font-mono">{order.id}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium">{order.items}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-10">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                                        <p className="font-black text-slate-900">{order.total}</p>
                                    </div>
                                    <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {orders.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                            <ShoppingBag size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">No orders found</h3>
                        <p className="text-slate-400 font-medium">Your purchase history will appear here once you make an order.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default OrderHistory;
