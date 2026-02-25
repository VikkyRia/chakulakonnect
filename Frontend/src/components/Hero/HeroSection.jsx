import AIWelcomeCard from "./AIWelcomeCard";
import RecommendedProducts from "./RecommendedProducts";

function HeroSection() {
  return (
    <section className="flex gap-12 px-16 py-10 items-start ">
      <AIWelcomeCard />
      <RecommendedProducts />
    </section>
  );
}

export default HeroSection;