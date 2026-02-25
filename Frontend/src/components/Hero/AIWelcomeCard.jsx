import { Sparkles, Target, ArrowRight } from "lucide-react";

function AIWelcomeCard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="w-full lg:max-w-[480px] min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-[#10B981] to-[#059669] rounded-[40px] p-8 sm:p-12 text-white flex flex-col gap-6 flex-shrink-0 relative overflow-hidden group border border-emerald-400/20 shadow-2xl shadow-emerald-900/10">

      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>

      <div className="relative z-10 flex flex-col gap-6 h-full">
        <div className="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] w-fit flex items-center gap-2 italic">
          <Sparkles size={14} className="text-yellow-300" /> AI Nutrition Insight
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight italic leading-tight">
            Good morning, <br />
            <span className="text-emerald-100">{user?.fullName?.split(" ")[0] || "Health Seeker"}!</span>
          </h2>

          <p className="text-sm sm:text-base font-medium leading-relaxed italic opacity-90">
            Based on your recent activity, you might need a boost of <span className="text-white font-black underline decoration-yellow-400 decoration-2 underline-offset-4">Iron</span> and <span className="text-white font-black underline decoration-yellow-400 decoration-2 underline-offset-4">Vitamin C</span> this week.
          </p>
        </div>

        <div className="mt-auto bg-black/15 backdrop-blur-sm border border-white/5 p-6 rounded-[32px] space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic">
            <span className="flex items-center gap-2"><Target size={14} className="text-emerald-400" /> Weekly Vitality Goal</span>
            <span className="bg-emerald-400/20 text-emerald-100 px-3 py-1 rounded-full border border-emerald-400/30">68%</span>
          </div>

          <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden p-1 border border-white/10">
            <div className="w-[68%] h-full bg-gradient-to-r from-emerald-300 to-yellow-300 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
          </div>
        </div>

        <button className="w-full bg-white text-emerald-900 font-black py-4 rounded-2xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-900/20 active:scale-95 text-xs uppercase tracking-widest group/btn">
          View Full Analysis <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default AIWelcomeCard;