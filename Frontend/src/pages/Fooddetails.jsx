import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Fooddetails.css"
import Footer from "../components/Footer/Footer";
import heart from "../assets/image/heart.svg";
import basket from "../assets/image/basket.png";
import qualityIcon from "../assets/image/quality.png";
import deliveryIcon from "../assets/image/delivery.png";
import nutritionIcon from "../assets/image/nutrition.svg"
import storeIcon from "../assets/image/store.svg"
import reviewIcon from "../assets/image/review.svg"
import pineapple from "../assets/image/pineapple.png"
import mangoes from "../assets/image/mangoes.png"
import tomatoes from "../assets/image/tomatoes.png"
import bananas from "../assets/image/bananas.png"


function FoodDetails() {
  const {id} = useParams();

  const { addToCart, addToBasket, increaseQuantity, decreaseQuantity,cartItems} = useCart();
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`https://chakulakonnect-backend.onrender.com/api/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data.data.food);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!food) return <p>Loading...</p>;

const cartItem = cartItems.find(
  item => item.id === food.id
);

const quantity = cartItem ? cartItem.quantity : 0;

const subtotal = quantity * food.price;
  const locationLabel = "In Stock (Lagos Hub)";
  const unitLabel = "per kg";
  const aiBadge = "✨ AI PRICE INSIGHT: OPTIMAL VALUE";
  const reviewsCount = 128;
  const rating = 5;
  const qualityBadge = "Grade A+";
  const deliveryLabel = "Same Day";
  
const recommendedItems = [
  {
    id: 1,
    name: "Organic Apple Mangoes",
    category: "Fruits",
    price: 1200,
    image: mangoes,
  },
  {
    id: 2,
    name: "Sweet Gold Pineapple",
    category: "Tropical",
    price: 1800,
    image: pineapple,
  },
  {
    id: 3,
    name: "Vine-Ripened Tomatoes",
    category: "Vegetables",
    price: 1500,
    image:tomatoes,
  },
  {
    id: 4,
    name: "Sweet Cavendish Bananas",
    category: "Fruits",
    price: 800,
    image: bananas
  },
];





  return (
    <div className="food-details container">

<div className="breadcrumbs">
  <Link to="/consumer-dashboard">Home</Link>
  <span> &gt; </span>
  <Link to="/marketplace">Marketplace</Link>
  <span> &gt; </span>
  <span>{food.name}</span>
</div>
      

      {/* TOP SECTION */}
      <div className="details-top">

        {/* LEFT SIDE */}
        <div className="image-section">
          <img
            src={food.images?.[0]}
            alt={food.name}
            className="main-image"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="info-section">

          {/* AI BADGE */}
          <div className="ai-badge">
            <span className="ai-icon"></span>
            {aiBadge}
          </div>

          <h1>{food.name}</h1>

                <div className="rating-row">
          <span className="stars">
            {"★".repeat(rating)}
          </span>

          <span className="review-count">
            ({reviewsCount} Reviews)
          </span>

          <span className="stock">
            • {locationLabel}
          </span>
        </div>
          {/* PRICE */}
          <p className="price">
            ₦{food.price} <span>/ {unitLabel}</span>
          </p>

          <p className="description">{food.description}</p>

          {/* QUANTITY + SUBTOTAL */}
          <div className="quantity-section">
  
<div className="quantity-box">
  <button onClick={() => decreaseQuantity(food.id)}>-</button>
  <span>{quantity}</span>
  <button onClick={() => increaseQuantity(food.id)}>+</button>
</div>
  <span className="subtotal">
    Subtotal: ₦{subtotal}
  </span>
</div>

          {/* ACTION BUTTONS */}
          <div className="action-buttons">
            <button
              className="add-btn"
              onClick={() => addToCart(food, quantity)}
            >
              <img src={basket} alt="cart"  className="btn-icon"/>
              Add to Cart
            </button>

            <button
              className="save-btn"
              onClick={() => addToBasket(food)}
            >
              <img src={heart} alt="Heart" className="heart-icon" />
              save to basket
            </button>
          </div>
            {/* QUALITY + DELIVERY */}
<div className="badges">

  <div className="badge-card">
    <div className="badge-icon">
      <img src={qualityIcon} alt="quality" />
    </div>
    <div className="badge-text">
      <span className="badge-label">QUALITY</span>
      <span className="badge-value">{qualityBadge}</span>
    </div>
  </div>

  <div className="badge-card">
    <div className="badge-icon">
      <img src={deliveryIcon} alt="delivery" />
    </div>
    <div className="badge-text">
      <span className="badge-label">DELIVERY</span>
      <span className="badge-value">{deliveryLabel}</span>
    </div>
  </div>

</div>
          

        </div>
      </div>

     {/* ================= MIDDLE SECTION ================= */}

<div className="details-middle">

  {/* -------- Nutritional Information -------- */}
  <div className="section">
    <h3>
      <img src={nutritionIcon} alt="nutrition" className="section-icon" />
      Nutritional Information
    </h3>

    <div className="card">
      <div className="info-row">
        <span>Calories</span>
        <span>{food.nutritionInfo?.calories}</span>
      </div>

      <div className="info-row">
        <span>Protein</span>
        <span>{food.nutritionInfo?.protein}</span>
      </div>

      <div className="info-row">
        <span>Carbs</span>
        <span>{food.nutritionInfo?.carbs}</span>
      </div>
    </div>
  </div>


  {/* -------- About the Seller -------- */}
  <div className="section">
    <h3>
      <img src={storeIcon} alt="seller" className="section-icon" />
      About the Seller
    </h3>

    <div className="card seller-card">
      <p className="seller-name">
        {food.seller?.fullname || "Verified Seller"}
      </p>

      <p className="seller-phone">
        {food.seller?.phoneNumber}
      </p>
    </div>
  </div>


  {/* -------- Recent Reviews -------- */}
  <div className="section">
    <h3>
      <img src={reviewIcon} alt="reviews" className="section-icon" />
      Recent Reviews
    </h3>

    <div className="card">
      <p className="no-reviews">
        No reviews yet.
      </p>
    </div>
  </div>

</div>
      <Footer />
    </div>
  );
}

export default FoodDetails;