import AIWelcomeCard from "./AIWelcomeCard";
import RecommendedProducts from "./RecommendedProducts";

function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-8 lg:px-16 py-6 lg:py-10 items-start">
      <AIWelcomeCard />
      <RecommendedProducts />
    </section>
  );
}

export default HeroSection;