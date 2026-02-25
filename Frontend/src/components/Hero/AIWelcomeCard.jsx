function AIWelcomeCard() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div className="max-w-[480px] min-h-[450px] bg-gradient-to-br from-[#2FBF71] to-[#1E9E57] rounded-[30px] p-10 text-white flex flex-col gap-5 flex-shrink-0">

      <div className="bg-white/20 px-3 py-1.5 rounded-full text-xs w-fit">
        ✨ AI Nutrition Insight
      </div>

      <h2 className="text-2xl font-semibold">
        Good morning, {user?.fullName?.split(" ")[0] || "there"}!
      </h2>

      <p className="text-sm leading-6 opacity-90">
        Based on your recent activity, you might need a boost of Iron and Vitamin C this week.
      </p>

      <div className="bg-black/15 p-4 rounded-xl">
        <div className="flex justify-between text-[13px] mb-2">
          <span>Weekly Goal</span>
          <span>68%</span>
        </div>

        <div className="w-full h-3 bg-white/30 rounded-md overflow-hidden">
          <div className="w-[68%] h-full bg-yellow-400 rounded-md"></div>
        </div>
      </div>

      <button className="bg-white text-green-600 font-semibold py-4 rounded-xl hover:opacity-90 transition">
        View Full Analysis →
      </button>

    </div>
  );
}

export default AIWelcomeCard;