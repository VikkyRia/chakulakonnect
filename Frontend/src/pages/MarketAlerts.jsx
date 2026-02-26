import {
    Bell,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle2,
    Calendar,
    ArrowRight,
    MapPin
} from 'lucide-react';

function MarketAlerts() {
    const alerts = [
        {
            id: 1,
            type: 'opportunity',
            title: 'Tomatoes Demand Spike',
            description: 'Demand for fresh tomatoes in Ikeja has increased by 40%. Consider listing your surplus stock now for premium pricing.',
            impact: '+15% Potential Rev',
            date: 'Just Now',
            icon: TrendingUp,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            borderColor: 'border-emerald-100'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Price Drop: Grains',
            description: 'Market average for Grains has dropped by ₦200/kg due to high supply. You might want to hold your listings or offer a bundle.',
            impact: '-8% Price Shift',
            date: '2 hours ago',
            icon: TrendingDown,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            borderColor: 'border-orange-100'
        },
        {
            id: 3,
            type: 'info',
            title: 'Logistics Update',
            description: 'New delivery routes opened in Victory Island. Shipping costs reduced by 5% for sellers in that region.',
            impact: 'Reduced Costs',
            date: 'Yesterday',
            icon: MapPin,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            borderColor: 'border-blue-100'
        }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50 shrink-0">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Market Alerts</h2>
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                        <Calendar size={20} />
                    </button>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
                        Mark All Read
                    </button>
                </div>
            </header>

            <main className="flex-1 p-8 lg:p-12 max-w-4xl w-full mx-auto">
                <div className="space-y-6">
                    {alerts.map((alert) => (
                        <div key={alert.id} className={`bg-white border ${alert.borderColor} rounded-[2.5rem] p-8 hover:shadow-2xl transition-all group relative overflow-hidden ring-1 ring-transparent hover:ring-emerald-500/20`}>
                            <div className={`absolute top-0 right-0 w-32 h-32 ${alert.bg} rounded-full blur-3xl opacity-40 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`}></div>

                            <div className="flex gap-6 relative z-10">
                                <div className={`w-14 h-14 rounded-3xl ${alert.bg} ${alert.color} flex items-center justify-center shrink-0 shadow-sm border ${alert.borderColor}`}>
                                    <alert.icon size={26} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{alert.title}</h3>
                                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${alert.bg} ${alert.color} border ${alert.borderColor}`}>
                                                    {alert.type}
                                                </span>
                                            </div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-emerald-600 tracking-tight bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                                                {alert.impact}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 font-medium leading-relaxed mb-6">
                                        {alert.description}
                                    </p>

                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-xl transition-all">
                                            Take Action <ArrowRight size={14} strokeWidth={3} />
                                        </button>
                                        <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 px-4 transition-colors">
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-slate-900 rounded-[3rem] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <Bell className="text-emerald-400 mx-auto mb-4" size={32} />
                        <h4 className="text-white font-black text-lg mb-2 tracking-tight">AI Prediction Engine</h4>
                        <p className="text-slate-400 text-sm font-medium mb-6 max-w-sm mx-auto leading-relaxed">
                            Our AI is analyzing market trends in real-time. You'll receive alerts as soon as we detect a profitable opportunity.
                        </p>
                        <button className="bg-emerald-500 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-900/40">
                            Configure Preferences
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MarketAlerts;
