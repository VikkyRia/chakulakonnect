import { Outlet } from "react-router-dom";
import MarketplaceNavbar from "../components/MarketplaceNavbar";
import Footer from "../components/Footer/Footer";

function Marketplace() {
  return (
    <>
      <MarketPlaceNavbar />
      <Outlet />
    </>
  );
}

export default Marketplace;