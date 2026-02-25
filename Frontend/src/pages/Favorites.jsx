import { Heart, ShoppingBag, ChevronRight, MapPin } from 'lucide-react';

function Favorites() {
    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-50 shrink-0">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Saved Favorites</h2>
            </header>

            <main className="flex-1 p-8 lg:p-12 max-w-5xl w-full mx-auto">
                <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-300">
                        <Heart size={40} fill="currentColor" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No favorites yet</h3>
                    <p className="text-slate-400 font-medium">Save items you love to find them easily later.</p>
                </div>
            </main>
        </div>
    );
}

export default Favorites;
