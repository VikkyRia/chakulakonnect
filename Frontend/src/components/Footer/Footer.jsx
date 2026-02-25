import "./Footer.css";
import logo from "../../assets/image/logo.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="footer-top">

        {/* BRAND SECTION */}
        <div className="footer-brand">
          <div className="brand-row">
            <img src={logo} alt="ChakulaKonnect" className="footer-logo" />
            <span className="brand-name">ChakulaKonnect</span>
          </div>

          <p className="brand-description">
            Connecting Nigerian households directly to the source.
            Fresh, sustainable, and powered by AI insights.
          </p>
        </div>

        {/* MARKETPLACE */}
        <div className="footer-column">
          <h4>Marketplace</h4>
          <p>Fresh Produce</p>
          <p>Dairy & Eggs</p>
          <p>Grains & Nuts</p>
        </div>

        {/* SUPPORT */}
        <div className="footer-column">
          <h4>Support</h4>
          <p>Help Center</p>
          <p>Track Order</p>
          <p>Contact</p>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="footer-bottom">
        © 2024 ChakulaKonnect Nigeria. All rights reserved.
      </div>
      </div>
    </footer>
  );
}

export default Footer;