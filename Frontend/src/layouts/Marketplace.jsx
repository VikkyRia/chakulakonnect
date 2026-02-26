import { Outlet } from "react-router-dom";
import MarketplaceNavbar from "../components/MarketplaceNavbar";
import Footer from "../components/Footer/Footer";

function Marketplace() {
  return (
    <>
      <MarketplaceNavbar />
      <Outlet />
    </>
  );
}

export default Marketplace;