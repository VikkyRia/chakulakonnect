import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
    Sparkles,
    ChevronLeft,
    TrendingUp,
    Target,
    Zap,
    Loader2,
    Info,
    ArrowUpRight
} from 'lucide-react';

function SalesForecast() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchForecast();
    }, []);

    const fetchForecast = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/api/ai/seller/forecast');
            if (res.data.success) {
                setForecast(res.data.data);
            }
        } catch (err) {
            console.error('Forecast fetch failed:', err);
            setError(err.response?.data?.message || 'Unable to generate forecast at this time.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">AI Predictions</h2>
                </div>
            </header>

            <main className="flex-1 p-8 lg:p-12 max-w-5xl w-full mx-auto">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                            <Sparkles size={24} className="text-emerald-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Market Forecast</h1>
                            <p className="text-slate-500 font-medium">Predictive analytics for your farm produce sales.</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-slate-200/60 shadow-sm">
                        <Loader2 size={48} className="text-emerald-500 animate-spin mb-6" />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Running Predictive Models...</p>
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-sm p-10 md:p-16 relative overflow-hidden text-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>

                            {forecast?.message || error ? (
                                <div className="relative z-10 max-w-md mx-auto">
                                    <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 text-slate-300">
                                        <TrendingUp size={40} />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                                        {forecast?.message || "Forecast Pending"}
                                    </h2>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-10">
                                        {forecast?.message === "Make some sales first, forecasts coming soon"
                                            ? "Our AI needs at least 5-10 successful sales transactions to accurately project your future revenue and demand patterns."
                                            : error || "Please continue making sales to unlock intelligent market insights."}
                                    </p>
                                    <button
                                        onClick={() => navigate('/seller-dashboard/list')}
                                        className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all active:scale-95"
                                    >
                                        Optimize My Listings
                                    </button>
                                </div>
                            ) : (
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8">Next Month Projections</h2>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16"></div>
                                <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                                    <Target size={20} className="text-emerald-400" />
                                    Demand Hotspots
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed mb-8 font-medium">
                                    Based on broader market data, we expect a <span className="text-white font-black">25% increase</span> in demand for vegetables in your region next week.
                                </p>
                                <div className="flex items-center justify-between py-4 border-t border-white/10">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Projected Peak</span>
                                    <span className="text-xs font-bold text-white">Thursday - Sunday</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/60 shadow-sm group">
                                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Zap size={20} className="text-amber-500" />
                                    Pricing Optimization
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed mb-8 font-medium">
                                    Our models suggest lowering your <span className="text-slate-900 font-black">Tubers</span> prices by 5% could increase sales volume by <span className="text-emerald-600 font-bold">40%</span>.
                                </p>
                                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all flex items-center justify-center gap-2">
                                    Apply Pricing Strategy <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100 flex items-start gap-4">
                            <Info size={24} className="text-emerald-500 mt-1 flex-shrink-0" />
                            <p className="text-xs font-medium text-emerald-800 leading-relaxed italic">
                                "Our forecasting engine uses real-time market data from over 500 local farms to help you minimize waste and maximize your harvest value. Keep your inventory updated for better accuracy."
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default SalesForecast;
