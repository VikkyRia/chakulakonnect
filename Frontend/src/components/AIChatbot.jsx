import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MessageSquare,
    X,
    Send,
    Sparkles,
    Loader2,
    ShoppingBasket,
    TrendingUp,
    Bot,
    User
} from 'lucide-react';
import api from '../utils/api';

function AIChatbot() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hello! I'm your AI Food Assistant. Tell me your budget (e.g., 'I have 5000 naira') and I'll suggest the best local food basket for you!"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const extractBudget = (text) => {
        const matches = text.match(/\d+/g);
        return matches ? parseInt(matches[0]) : null;
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');

        // Add user message
        const newMessages = [
            ...messages,
            { id: Date.now(), type: 'user', text: userMsg }
        ];
        setMessages(newMessages);

        const budget = extractBudget(userMsg);

        if (budget) {
            setIsTyping(true);
            try {
                const res = await api.post('/api/ai/recommendations', { budget });
                if (res.data.success) {
                    const data = res.data.data;
                    const itemsText = data.recommended_basket.map(food =>
                        `• ${food.name} - ₦${food.price.toLocaleString()}`
                    ).join('\n');

                    const botReply = `Based on your budget of ₦${budget.toLocaleString()}, I've curated this smart basket for you:\n\n${itemsText}\n\n✨ Total Cost: ₦${data.total_cost.toLocaleString()}\n🚀 Total Savings: ₦${data.savings.toLocaleString()}\n\nWould you like to view these in the Marketplace?`;

                    setMessages(prev => [
                        ...prev,
                        { id: Date.now() + 1, type: 'bot', text: botReply, special: 'basket' }
                    ]);
                }
            } catch (err) {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, type: 'bot', text: "I'm sorry, I'm having trouble accessing my database right now. Could you please try again?" }
                ]);
            } finally {
                setIsTyping(false);
            }
        } else {
            setIsTyping(true);
            setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now() + 1, type: 'bot', text: "I didn't quite catch your budget. Try saying something like 'I have 2000 naira' or just send me a number!" }
                ]);
                setIsTyping(false);
            }, 600);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[380px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-slate-900 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <Sparkles size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-white text-sm font-black tracking-tight">Food Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">AI Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar"
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
                            >
                                <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.type === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                        {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${msg.type === 'user'
                                        ? 'bg-slate-900 text-white rounded-tr-none'
                                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                                        }`}>
                                        <div className="whitespace-pre-wrap">{msg.text}</div>
                                        {msg.special === 'basket' && (
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    navigate('/budget-helper');
                                                }}
                                                className="mt-4 w-full py-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                            >
                                                Go to Budget Helper
                                                <ShoppingBasket size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start animate-pulse">
                                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
                        <div className="relative group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your budget (e.g. 5000)..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-4 pr-12 py-4 text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 disabled:opacity-30 disabled:hover:bg-slate-900 transition-all active:scale-90"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-[1.5rem] shadow-2xl flex items-center justify-center transition-all duration-300 active:scale-90 group relative ${isOpen ? 'bg-white text-slate-900 border border-slate-100 rotate-90' : 'bg-slate-900 text-white hover:bg-emerald-600 scale-100'
                    }`}
            >
                {isOpen ? <X size={28} /> : (
                    <>
                        <MessageSquare size={28} />
                        {!isOpen && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                        )}
                    </>
                )}

                {/* Tooltip for first-time visibility */}
                {!isOpen && (
                    <div className="absolute right-20 bg-white border border-slate-100 rounded-xl px-4 py-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Ask for Food Suggestions ✨</span>
                    </div>
                )}
            </button>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s ease-in-out infinite;
                }
            `}} />
        </div>
    );
}

export default AIChatbot;
