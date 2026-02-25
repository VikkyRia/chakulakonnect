
import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/Hero/HeroSection";
import CategoryRow from "../components/category/CategoryRow";
import DealsSection from "../components/Deals/DealsSection";
import FeaturedSellers from "../components/sellers/FeaturedSellers";

function ConsumerDashboard() {
    return (
        <div className="bg-[#F7FAF8] min-h-screen">
            <Navbar />
            <HeroSection />
            <CategoryRow />
            <DealsSection />
            <FeaturedSellers />
        </div>
    );
}


export default ConsumerDashboard;