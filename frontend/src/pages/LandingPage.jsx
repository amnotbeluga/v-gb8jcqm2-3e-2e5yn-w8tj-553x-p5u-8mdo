import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../index.css';
import HeroSection from "../Helper/LandingPage/HeroSection";
import TopDestinations from "../Helper/LandingPage/TopDestinations";
import CategoryPlaces from "../Helper/LandingPage/CategoryPlaces";
import VideoBanner from "../Helper/LandingPage/VideoBanner";
import Stories from "../Helper/LandingPage/Stories";
import Visits from "../Helper/LandingPage/Visits";
import Chatbot from "../Helper/LandingPage/Chatbot";
import AccommodationCards from "../Helper/LandingPage/AccommodationCards";
import Reveal from "../components/Reveal";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Reveal>
        <HeroSection />
      </Reveal>

      <Reveal>
        <TopDestinations />
      </Reveal>

      <Reveal>
        <CategoryPlaces />
      </Reveal>

      <Reveal>
        <VideoBanner />
      </Reveal>

      <Reveal>
        <AccommodationCards />
      </Reveal>

      <Reveal>
        <Stories />
      </Reveal>

      <Reveal>
        <Visits />
      </Reveal>

      {/* Chat fixed - no animation */}
      <Chatbot />

      <Footer />
    </div>
  );
}

export default LandingPage;
