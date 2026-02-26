import { useNavigate } from "react-router-dom";
import { Star, MapPin, ArrowRight } from "lucide-react";

import seller1 from "../../assets/image/Seller1.png";
import seller2 from "../../assets/image/seller2.png";
import seller3 from "../../assets/image/seller3.png";

const sellers = [
  {
    id: 1,
    name: "Mama Sarah's Garden",
    location: "Surulere, Lagos",
    badge: "Organic",
    description:
      "Providing the freshest leafy greens and seasonal vegetables directly from our family business.",
    rating: 4.9,
    image: seller1,
  },
  {
    id: 2,
    name: "Highland Farms",
    location: "Jos, Plateau",
    badge: "Eco-Friendly",
    description:
      "Specializing in root vegetables and dairy. Our sellers focus on sustainable practices.",
    rating: 4.7,
    image: seller2,
  },
  {
    id: 3,
    name: "Sunny Side Poultry",
    location: "Ibadan, Oyo",
    badge: "Free Range",
    description:
      "Healthy products from expert sellers. Our poultry is free-range and grain-fed.",
    rating: 4.8,
    image: seller3,
  },
];

function FeaturedSellers() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight italic">Featured Sellers</h2>
            <p className="text-slate-500 font-medium mt-2 italic">Handpicked local producers delivering excellence</p>
          </div>
          <button className="text-green-600 font-black text-sm uppercase tracking-widest italic group overflow-hidden flex items-center gap-2">
            See All Sellers <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              className="group bg-white rounded-[40px] p-6 border border-slate-100 hover:border-green-100 transition-all duration-500 hover:shadow-2xl hover:shadow-green-50 flex flex-col active:scale-[0.98]"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-[32px] overflow-hidden border-4 border-slate-50 group-hover:border-emerald-50 transition-colors">
                    <img src={seller.image} alt={seller.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="absolute -bottom-2 translate-x-1/2 right-1/2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg italic whitespace-nowrap border-2 border-white">
                    {seller.badge}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight italic truncate mb-1">{seller.name}</h3>
                  <p className="text-slate-400 font-bold text-xs flex items-center gap-1 italic">
                    <MapPin size={12} className="text-emerald-500" /> {seller.location}
                  </p>
                </div>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed italic mb-8 flex-1">
                "{seller.description}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-xl">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-yellow-700 font-black text-sm">{seller.rating}</span>
                </div>

                <button
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-black rounded-2xl hover:bg-emerald-600 transition-all active:scale-95 shadow-lg hover:shadow-emerald-100 uppercase tracking-widest"
                  onClick={() => navigate(`/seller/${seller.id}`)}
                >
                  Visit Store
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSellers;
