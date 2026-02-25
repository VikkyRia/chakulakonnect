import "./FeaturedSellers.css";
import { useNavigate } from "react-router-dom";

import seller1 from "../../assets/image/seller1.png";
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
    <section className="featured-section">
      <div className="featured-header">
        <h2>Featured Sellers</h2>
        <span className="see-all">See All →</span>
      </div>

      <div className="seller-grid">
        {sellers.map((seller) => (
          <div key={seller.id} className="seller-card">
            
            <div className="seller-top">
              
              {/* IMAGE + BADGE */}
              <div className="image-wrapper">
                <img src={seller.image} alt={seller.name} />
                <span className="image-badge">{seller.badge}</span>
              </div>

              {/* INFO */}
              <div className="seller-info">
                <h3>{seller.name}</h3>
                <p className="seller-location">
                  📍 {seller.location}
                </p>
              </div>

            </div>

            <p className="seller-description">
              {seller.description}
            </p>

            <div className="seller-footer">
              <span className="rating">⭐ {seller.rating}</span>

              <button
                className="visit-btn"
                onClick={() => navigate(`/seller/${seller.id}`)}
              >
                Visit Store
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedSellers;