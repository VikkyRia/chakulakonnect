import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import {
    Sparkles,
    ChevronLeft,
    Wallet,
    ShoppingBasket,
    TrendingUp,
    Leaf,
    ArrowRight,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Info
} from 'lucide-react';

function BudgetHelper() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [budget, setBudget] = useState('');
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        setUser(getCurrentUser());
    }, [navigate]);

    const handleGetRecommendations = async (e) => {
        if (e) e.preventDefault();
        if (!budget || isNaN(budget) || Number(budget) <= 0) {
            setError('Please enter a valid budget amount.');
            return;
        }

        setLoading(true);
        setError('');
        setRecommendations(null);

        try {
            const res = await api.post('/api/ai/recommendations', { budget: Number(budget) });
            if (res.data.success) {
                setRecommendations(res.data.data);
            }
        } catch (err) {
            console.error('AI Suggestion failed:', err);
            setError(err.response?.data?.message || 'The AI is currently processing other requests. Please try again in a moment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                        <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">AI Budget Planner</h2>
                </div>
            </header>

            <main className="flex-1 p-8 lg:p-12 max-w-5xl w-full mx-auto">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-100">
                        <Sparkles size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Meal Planning</h1>
                    <p className="text-slate-500 font-medium leading-relaxed italic">
                        Enter your weekly budget, and our AI will curate the most nutritious, cost-effective basket of surplus farm produce just for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
                    {/* Input Section */}
                    <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-sm p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>

                        <form onSubmit={handleGetRecommendations} className="relative z-10">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 block text-center">Your Target Budget (₦)</label>
                            <div className="relative mb-10">
                                <div className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl font-black text-slate-200">₦</div>
                                <input
                                    type="number"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    placeholder="5000"
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] pl-20 pr-10 py-8 text-5xl font-black text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner placeholder:text-slate-100 tracking-tighter"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-emerald-600 shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        Analyzing Market Data...
                                    </>
                                ) : (
                                    <>
                                        Generate Smart Basket
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="mt-8 p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 animate-shake">
                                    <AlertCircle className="text-rose-500" size={20} />
                                    <span className="text-xs font-black text-rose-600 uppercase tracking-widest">{error}</span>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Results Section */}
                    {recommendations && (
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                                    <ShoppingBasket size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900">Recommended Basket</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-8 flex items-center gap-6">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                                        <Wallet size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Cost</p>
                                        <h3 className="text-3xl font-black text-slate-900">₦{recommendations.total_cost.toLocaleString()}</h3>
                                    </div>
                                </div>

                                <div className="bg-emerald-600 rounded-[2.5rem] shadow-xl shadow-emerald-100 p-8 flex items-center gap-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl group-hover:scale-110 transition-transform duration-700"></div>
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center relative z-10">
                                        <TrendingUp size={28} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mb-1">Total Savings</p>
                                        <h3 className="text-3xl font-black text-white">₦{recommendations.savings.toLocaleString()}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-sm overflow-hidden mb-12">
                                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50">
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                        Optimal Nutritional Balance
                                    </h3>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {recommendations.recommended_basket.map((item, idx) => (
                                        <div key={idx} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden group-hover:scale-105 transition-transform">
                                                    {item.images?.[0] ? <img src={item.images[0]} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><ShoppingBasket size={20} /></div>}
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-tight">{item.name}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400">{item.category} • {item.location?.city}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-black text-slate-900 tracking-tighter">₦{item.price.toLocaleString()}</div>
                                                <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Surplus Deal</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-10 bg-slate-900">
                                    <div className="flex items-start gap-4 text-white/90">
                                        <Info className="text-emerald-400 mt-1 flex-shrink-0" size={20} />
                                        <p className="text-xs font-medium leading-relaxed italic opacity-80">
                                            "This basket focuses on high-protein and high-fiber grains that were harvested within the last 48 hours. By choosing these items, you're directly helping farmers reduce post-harvest loss."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/categories')}
                                className="w-full py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                            >
                                Add All to Cart
                                <ShoppingBasket size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default BudgetHelper;
