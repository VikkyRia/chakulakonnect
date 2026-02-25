import { useNavigate } from "react-router-dom";
import "./CategoryRow.css";

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
    <div className="category-row">
      {categories.map((item) => (
        <div
          key={item.id}
          className="category-item"
          onClick={() =>
            navigate(`/consumer-dashboard?category=${item.name}`)
          }
        >
          <div className="category-circle">
            <img src={item.image} alt={item.name} />
          </div>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryRow;