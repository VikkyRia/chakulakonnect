import { MapPin, Package, Truck, CheckCircle2, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TrackOrders() {
    const navigate = useNavigate();

    const activeOrders = [
        {
            id: '#CK-9285',
            vendor: 'Lagos Urban Garden',
            status: 'In Transit',
            estimate: 'Arriving in 15 mins',
            location: 'Victoria Island, Lagos',
            lastUpdate: 'Package reached local facility',
            progress: 75
        }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 rounded-xl transition-all">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Track Your Harvest</h2>
                </div>
            </header>

            <main className="flex-1 p-8 lg:p-12 max-w-5xl w-full mx-auto">
                <div className="mb-10 p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-2">Real-time Logistics</h3>
                        <p className="text-slate-400 font-medium mb-8">Follow your farm-fresh produce from field to front door.</p>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter Order ID (e.g. #CK-0000)"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold outline-none focus:bg-white/10 focus:border-emerald-500 transition-all"
                                />
                            </div>
                            <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/40 active:scale-95">
                                Track Order
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-4">Active Deliveries</h4>

                    {activeOrders.map((order) => (
                        <div key={order.id} className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all group">
                            <div className="flex flex-wrap items-start justify-between gap-10 mb-12">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm">
                                        <Truck size={30} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-black text-slate-900 tracking-tight">{order.vendor}</h3>
                                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">{order.id}</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                            <MapPin size={14} className="text-emerald-500" />
                                            {order.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
                                    <p className="text-xl font-black text-emerald-600 tracking-tight">{order.estimate}</p>
                                </div>
                            </div>

                            <div className="relative mb-8">
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/10">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                        style={{ width: `${order.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-6">
                                    {[
                                        { label: 'Confirmed', icon: CheckCircle2, done: true },
                                        { label: 'Sourcing', icon: Package, done: true },
                                        { label: 'On Way', icon: Truck, done: true },
                                        { label: 'Delivered', icon: CheckCircle2, done: false },
                                    ].map((step, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-2 group/step">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step.done ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-50 text-slate-300'}`}>
                                                <step.icon size={18} strokeWidth={step.done ? 3 : 2} />
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-widest ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <p className="text-xs font-bold text-slate-600 tracking-tight">{order.lastUpdate}</p>
                                </div>
                                <button className="text-[10px] font-black uppercase text-emerald-600 hover:underline tracking-widest">Live Map View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default TrackOrders;
