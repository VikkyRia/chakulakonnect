import "./DealsSection.css";

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
    <section className="deals-section">
      <div className="deals-container">
        <div className="deals-header">
          <div>
            <h2>Deals Near You</h2>
            <p className="location">Near Ikeja, Lagos (within 5km)</p>
          </div>
          <span className="see-all">See All →</span>
        </div>

        <div className="deals-row">
          {deals.map((item) => (
            <div className="deal-card" key={item.id}>
              <div className="deal-image">
                <img src={item.image} alt={item.name} />
                <span className="discount">{item.discount}</span>
              </div>

              <div className="deal-info">
                <h4>{item.name}</h4>
                <p className="distance">{item.distance}</p>

                <div className="price-row">
                  <span className="new-price">{item.newPrice}</span>
                  <span className="old-price">{item.oldPrice}</span>
                  <button className="add-small">+</button>
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