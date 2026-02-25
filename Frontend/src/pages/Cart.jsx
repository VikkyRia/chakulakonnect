import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import "./Cart.css";

import ginger from "../assets/image/ginger.png";
import garlic from "../assets/image/garlic.png";
import onions from "../assets/image/onions.png";
import palmOil from "../assets/image/palmOil.png";
import peppers from "../assets/image/pepper.png"


function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const deliveryFee = 1500;
  const serviceFee = 500;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + deliveryFee + serviceFee;

  return (
    <>
      <div className="ckCart-page">

        {/* Breadcrumb */}
        <div className="ckCart-breadcrumb">
          <Link to="/consumer-dashboard">Home</Link>
          <span> › </span>
          <Link to="/marketplace">Marketplace</Link>
          <span> › </span>
          <span className="ckCart-activeBreadcrumb">
            Shopping Cart
          </span>
        </div>

        {/* Title */}
        <h1 className="ckCart-title">
          Your Cart
          <span className="ckCart-itemCount">
            {cartItems.length} items
          </span>
        </h1>

        <div className="ckCart-layout">

          {/* LEFT SIDE */}
          <div>

            {cartItems.map((item) => (
              <div key={item.id} className="ckCart-itemCard">

                {/* IMAGE */}
                <div className="ckCart-imageWrapper">
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.name}
                  />
                </div>

                {/* PRODUCT INFO */}
                <div className="ckCart-itemInfo">
                  <h3>{item.name}</h3>
                  <p className="ckCart-subText">
                    Sold per basket (5kg)
                  </p>

                  <div className="ckCart-qtyBox">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="ckCart-itemRight">

                  <button
                    className="ckCart-deleteBtn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Delete item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#a39e9e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>

                  <div className="ckCart-price">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </div>

                </div>
              </div>
            ))}

            <Link
              to="/consumer-dashboard"
              className="ckCart-continueLink"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* SUMMARY */}
          <div className="ckCart-summaryCard">

            <h3 className="ckCart-summaryTitle">
              Order Summary
            </h3>

            <div className="ckCart-summaryRow">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="ckCart-money">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="ckCart-summaryRow">
              <span>Delivery Fee</span>
              <span className="ckCart-money">
                ₦{deliveryFee.toLocaleString()}
              </span>
            </div>

            <div className="ckCart-summaryRow">
              <span>Service Charge</span>
              <span className="ckCart-money">
                ₦{serviceFee.toLocaleString()}
              </span>
            </div>

            <div className="ckCart-promoRow">
              <input placeholder="Enter promo code" />
              <button>Apply</button>
            </div>

            <div className="ckCart-totalRow">
              <span>Total</span>
              <span className="ckCart-money">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <button className="ckCart-checkoutBtn">
              🛒 Proceed to Checkout →
            </button>

            <p className="ckCart-secureText">
              Secure checkout with Paystack
            </p>

          </div>
        </div>

        {/* FBT */}
        <div className="ckCart-fbtSection">
          <h3 className="ckCart-fbtTitle">
            Frequently Bought Together
            <span className="ckCart-recommendedText">
              (recommended for you)
            </span>
          </h3>

          <div className="ckCart-fbtGrid">

            <div className="ckCart-fbtCard">
              <img src={ginger} alt="" className="ckCart-fbtImage" />
              <h4>Fresh Ginger Root</h4>
              <p className="ckCart-fbtDetail">250 grams pack</p>
              <p className="ckCart-fbtPrice">₦800</p>
            </div>

            <div className="ckCart-fbtCard">
              <img src={garlic} alt="" className="ckCart-fbtImage" />
              <h4>Premium White Garlic</h4>
              <p className="ckCart-fbtDetail">3 liters box</p>
              <p className="ckCart-fbtPrice">₦650</p>
            </div>

            <div className="ckCart-fbtCard">
              <img src={onions} alt="" className="ckCart-fbtImage" />
              <h4>Bulk Red Onions</h4>
              <p className="ckCart-fbtDetail">1 kg small basket</p>
              <p className="ckCart-fbtPrice">₦1,100</p>
            </div>

            <div className="ckCart-fbtCard">
              <img src={palmOil} alt="" className="ckCart-fbtImage" />
              <h4>Pure Red Palm Oil</h4>
              <p className="ckCart-fbtDetail">1 liter bottle</p>
              <p className="ckCart-fbtPrice">₦2,200</p>
            </div>

            <div className="ckCart-fbtCard">
              <img src={peppers}alt="" className="ckCart-fbtImage" />
              <h4>Assorted Bell Peppers</h4>
              <p className="ckCart-fbtDetail">3 pack of 3</p>
              <p className="ckCart-fbtPrice">₦1,500</p>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Cart;