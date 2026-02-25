
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/Hero/HeroSection";
import CategoryRow from "../components/Category/CategoryRow";
import DealsSection from "../components/Deals/DealsSection";
import FeaturedSellers from "../components/sellers/FeaturedSellers";

function ConsumerDashboard() {
  return (
    <div
      style={{
        backgroundColor: "#F7FAF8",
        // minHeight: "100vh"
      }}
    >
      <Navbar />
      <HeroSection />
      <CategoryRow />
      <DealsSection/>
      <FeaturedSellers/>
    </div>
  );
}

export default ConsumerDashboard;