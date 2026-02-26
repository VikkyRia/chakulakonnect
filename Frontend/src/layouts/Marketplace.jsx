import { Outlet } from "react-router-dom";
import MarketPlaceNavbar from "../components/MarketPlaceNavbar"; 
import Footer from "../components/Footer/Footer";

function Marketplace() {
  return (
    <>
      <MarketPlaceNavbar/>
      <Outlet/>
    </>
  );
}

export default Marketplace;