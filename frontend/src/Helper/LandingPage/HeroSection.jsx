import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Store, ArrowRight, MapPin, Users, Star } from "lucide-react";
import { LanguageContext } from "../../context/LanguageContext";
import useTranslateLanding from "../../hooks/useTranslateLanding";
import "swiper/css";
import "swiper/css/navigation";

// Typewriter Component
function TypewriterText({ text, speed = 40, className }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{display}</span>;
}

function HeroSection() {
  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bgReady, setBgReady] = useState(false); // typing start trigger

  const duration = 8000;

  // video switch
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
      setProgress(0);
    }, duration);
    return () => clearInterval(timer);
  }, []);

  // video progress
  useEffect(() => {
    const interval = setInterval(
      () => setProgress((p) => Math.min(p + 1, 100)),
      duration / 100
    );
    return () => clearInterval(interval);
  }, [currentVideo]);

  const { lang } = useContext(LanguageContext);

  const tDiscover = useTranslateLanding("discover_title", lang);
  const tSubtitle = useTranslateLanding("subtitle", lang);
  const tDescription = useTranslateLanding("description", lang);
  const tPlanTrip = useTranslateLanding("plan_trip", lang);
  const tExploreCulture = useTranslateLanding("explore_culture", lang);
  const tStatSpots = useTranslateLanding("stat_spots", lang);
  const tStatVisitors = useTranslateLanding("stat_visitors", lang);
  const tStatRatings = useTranslateLanding("stat_ratings", lang);

  return (
    <div className="relative h-screen overflow-hidden">

      {/* Background Videos */}
<div className="absolute inset-0 -z-10 overflow-hidden">
  {videos.map((video, index) => (
    <video
      key={index}
      src={video}
      autoPlay
      muted
      loop
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
        currentVideo === index ? "opacity-100" : "opacity-0"
      }`}
    />
  ))}

  {/* dark overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* cinematic gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/70"></div>

  {/* vignette */}
  <div className="absolute inset-0 pointer-events-none 
       shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]">
  </div>
</div>


      {/* BLACK MASK WIPE UP ANIMATION */}
      <motion.div
        className="absolute inset-0 bg-red-100 -z-0"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
        onAnimationComplete={() => setBgReady(true)}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end px-6 text-center bg-transparent bg-black bg-opacity-70">

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: bgReady ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {bgReady && <TypewriterText text={tDiscover} />}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: bgReady ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-green-500 via-yellow-300 to-accent bg-clip-text text-transparent">
            {bgReady && <TypewriterText text={tSubtitle} />}
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xl text-white mb-10 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: bgReady ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {bgReady && <TypewriterText text={tDescription} speed={25} />}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: bgReady ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Link
            to="/itinerary"
            className="flex items-center space-x-2 bg-primary hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            <Calendar size={20} />
            <span>{bgReady && <TypewriterText text={tPlanTrip} />}</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/marketplace"
            className="flex items-center space-x-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium"
          >
            <Store size={20} />
            <span>{bgReady && <TypewriterText text={tExploreCulture} />}</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: bgReady ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-lg">
            <MapPin size={28} className="mb-2" />
            <h3 className="text-2xl font-bold">50+</h3>
            <p className="text-sm">{bgReady && <TypewriterText text={tStatSpots} />}</p>
          </div>

          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-lg">
            <Users size={28} className="mb-2" />
            <h3 className="text-2xl font-bold">10K+</h3>
            <p className="text-sm">{bgReady && <TypewriterText text={tStatVisitors} />}</p>
          </div>

          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-lg">
            <Star size={28} className="mb-2" />
            <h3 className="text-2xl font-bold">4.8</h3>
            <p className="text-sm">{bgReady && <TypewriterText text={tStatRatings} />}</p>
          </div>
        </motion.div>
      </div>

      {/* Progress Bars */}
      <div className="absolute bottom-6 w-full flex items-center justify-center gap-3 z-[999999] pointer-events-auto">
        {videos.map((_, idx) => (
          <div key={idx} className="relative w-20 h-[4px] bg-white/40 rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-red-500"
              style={{
                transform:
                  idx === currentVideo ? `scaleX(${progress / 100})` : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.1s linear",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
