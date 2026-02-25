
import tomatoes from "../../assets/image/Tomatoes.svg";
import cheese from "../../assets/image/other.svg";
import avocado from "../../assets/image/Avocados.svg";
import oranges from "../../assets/image/Oranges.svg";

const deals = [
  {
    id: 1,
    name: "Roma Tomatoes",
    distance: "1.2km away",
    newPrice: "₦800",
    oldPrice: "₦1,000",
    discount: "-20%",
    image: tomatoes,
  },
  {
    id: 2,
    name: "Farm Cheese",
    distance: "2.5km away",
    newPrice: "₦6,500",
    oldPrice: "₦7,650",
    discount: "-15%",
    image: cheese,
  },
  {
    id: 3,
    name: "Hass Avocados",
    distance: "3.0km away",
    newPrice: "₦1,200",
    oldPrice: "₦1,350",
    discount: "-10%",
    image: avocado,
  },
  {
    id: 4,
    name: "Juicy Oranges",
    distance: "0.8km away",
    newPrice: "₦2,500",
    oldPrice: "₦3,350",
    discount: "-25%",
    image: oranges,
  },
];

function DealsRow() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">Deals Near You</h2>
            <p className="text-slate-500 font-medium mt-1 italic">Near Ikeja, Lagos (within 5km)</p>
          </div>
          <button className="text-green-600 font-black text-sm uppercase tracking-widest italic group overflow-hidden">
            See All <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {deals.map((item) => (
            <div
              className="min-w-[280px] sm:min-w-[350px] bg-white rounded-[32px] p-4 sm:p-5 flex gap-4 sm:gap-6 shadow-xl shadow-slate-100 border border-slate-50 hover:shadow-2xl hover:shadow-green-50 transition-all duration-300 snap-start active:scale-95 cursor-pointer group"
              key={item.id}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-2xl sm:rounded-[24px]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] sm:text-xs font-black px-2 py-1 rounded-lg shadow-lg">
                  {item.discount}
                </span>
              </div>

              <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 truncate italic">{item.name}</h4>
                  <p className="text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mt-1 italic">{item.distance}</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <div className="flex flex-col items-start">
                    <span className="text-green-600 text-base sm:text-lg font-black italic">{item.newPrice}</span>
                    <span className="text-slate-300 text-[10px] sm:text-xs line-through font-bold">{item.oldPrice}</span>
                  </div>
                  <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl sm:text-2xl font-black hover:bg-emerald-600 hover:text-white transition-all active:scale-90 shadow-sm">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DealsRow;