import { useNavigate } from "react-router-dom";

import vegetables from "../../assets/image/vegetables.jpg";
import fruits from "../../assets/image/fruits.jpg";
import grains from "../../assets/image/grains.jpg";
import proteins from "../../assets/image/proteins.jpg";
import dairy from "../../assets/image/dairy.jpg";
import legumes from "../../assets/image/legumes.jpg";
import tubers from "../../assets/image/tubers.jpg";
import spices from "../../assets/image/spices.jpg";
import other from "../../assets/image/other.svg";

const categories = [
  { id: 1, name: "Vegetables", image: vegetables },
  { id: 2, name: "Fruits", image: fruits },
  { id: 3, name: "Grains", image: grains },
  { id: 4, name: "Proteins", image: proteins },
  { id: 5, name: "Dairy", image: dairy },
  { id: 6, name: "Legumes", image: legumes },
  { id: 7, name: "Tubers", image: tubers },
  { id: 8, name: "Spices", image: spices },
  { id: 9, name: "Other", image: other },
];

function CategoryRow() {
  const navigate = useNavigate();

  return (
    <div className="py-10 bg-white border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 sm:gap-12 overflow-x-auto no-scrollbar pb-4 snap-x">
          {categories.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col items-center gap-3 cursor-pointer snap-start flex-shrink-0 active:scale-95 transition-all"
              onClick={() =>
                navigate(`/consumer-dashboard?category=${item.name}`)
              }
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-emerald-500 shadow-sm group-hover:shadow-xl group-hover:shadow-emerald-100 transition-all duration-300">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[10px] sm:text-xs font-black text-slate-500 group-hover:text-slate-900 uppercase tracking-widest italic transition-colors">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryRow;