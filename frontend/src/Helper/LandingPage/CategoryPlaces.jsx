import React from 'react'
import { useState,useContext,useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import useTranslateLanding from "../../hooks/useTranslateLanding";
const cards = [
  {
    id: 1,
    img: "https://sushantsinha77.com/wp-content/uploads/2023/07/netarhat-jharkhand-india-february-15-260nw-1842804121-edited.jpg",
    title: "Hill Station",
    link: "/HillStation",
  },
  {
    id: 2,
    img: "https://www.india-tours.com/wildlife/images/wildlife/national-parks/betla-national-park.jpg",
    title: "WildLife Centuries and Park",
    link: "/park",
  },
  {
    id: 3,
    img: "https://th.bing.com/th/id/R.027bcb940a7e19447fe1c417abc349a5?rik=HCYFUA1ZlthF2Q&riu=http%3a%2f%2fim.hunt.in%2fcg%2fRanchi%2fCity-Guide%2fHundru-falls2.JPG&ehk=6IqXUfKQqj8pOYf8fuzUkOhNsNZjfwgIwxiCQ7uNQfE%3d&risl=&pid=ImgRaw&r=0",
    title: "Waterfalls",
    link: "/waterfall"
  },
  {
    id: 4,
    img: "https://th.bing.com/th/id/R.7e6c69ea42c7520000d58a0f2d4b014f?rik=AQSTOYruISC%2f6Q&riu=http%3a%2f%2fwww.team-bhp.com%2fforum%2fattachments%2ftravelogues%2f983280d1347210375-scintillating-patratu-valley-jharkhand-dsc04653.jpg&ehk=FNklXX9kDQeehvKY7MrrvFO%2bItfm8QMdNK9SrGMFlu4%3d&risl=&pid=ImgRaw&r=0",
    title: "Valley",
    link: "/valley",
  },
  {
    id: 5,
    img: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/09/Deoghar-Baidyanath-Temple.jpg",
    title: "Religious Sites",
    link: "/temples",
  },
  {
    id: 6,
    img: "https://t3.ftcdn.net/jpg/06/21/17/72/360_F_621177263_tCEXLhnqj32aIlM8LK4xd7oS7WuavUOn.jpg",
    title: "Famous Cities",
    link: "/famousCities",
  },
];
function CategoryPlaces() {
  const { lang } = useContext(LanguageContext);
   const tFeaturedTitle = useTranslateLanding("featured_title", lang);
    const tFeaturedSubtitle = useTranslateLanding("featured_subtitle", lang);
    const tExplore = useTranslateLanding("explore", lang);
    const navigate = useNavigate();
      const [active, setActive] = useState(0); // center card index

  // AUTO-PLAY
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 2500); // Change slide every 2.5 sec
    return () => clearInterval(timer);
  }, []);
 const getCircularOffset = (index, active, total) => {
  let offset = index - active;

  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  // NEW: restrict offset range
  if (offset > 2) offset = 2;
  if (offset < -2) offset = -2;

  return offset;
};

  return (
    <section className="pt-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
  className="text-center mb-4 relative"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
    {tFeaturedTitle}
  </h2>
  <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
    {tFeaturedSubtitle}
  </p>

  {/* VIEW ALL BUTTON - RIGHT ALIGN */}
  <div className="w-full flex justify-end mt-4 pr-2">
    <Link
      to="/places"
      className="text-primary border-2 p-2 font-semibold text-lg rounded hover:text-green-400 transition"
    >
      View All →
    </Link>
  </div>
</motion.div>


          <div className="relative w-full flex flex-col items-center py-16">

      {/* BACKGROUND FADE */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-60 blur-3xl"
        animate={{ backgroundImage: `url(${cards[active].img})` }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* LEFT BLUR EDGE */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none blur-xl"></div>
      {/* RIGHT BLUR EDGE */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none blur-xl"></div>

      {/* LEFT BUTTON */}
      <button
        className="absolute left-9 z-20 text-orange-500 text-5xl font-bold top-1/2"
        onClick={() =>
          setActive((p) => (p - 1 + cards.length) % cards.length)
        }
      >
        ‹
      </button>

      {/* SLIDER CONTAINER */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1600px", height: "550px", width: "100%" }}
      >
        {cards.map((card, index) => {
          const offset = getCircularOffset(index, active, cards.length);
          const scale = offset === 0 ? 1.30 : 0.85;
          const rotateY = offset * -30;
          const translateX = offset * 240;


          return (
            <motion.div
              key={index}
              className="absolute w-80 h-[500px] rounded-3xl overflow-hidden shadow-xl cursor-pointer bg-white"
              animate={{
  x: translateX,
  rotateY,
  scale,
  zIndex: offset === 0 ? 20 : -Math.abs(offset),
  filter:
    offset === 0
      ? "brightness(1.2) drop-shadow(0px 0px 25px rgba(34,197,94,0.65))"
      : "brightness(0.85) blur(1px)",
  boxShadow:
    offset === 0
      ? "0px 0px 35px rgba(34,197,94,0.6)"
      : "0px 10px 25px rgba(0,0,0,0.25)"
}}

              transition={{ duration: 0.8, type: "spring" }}
              onClick={() => setActive(index)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link to={card.link}>
                <div className="relative group h-full">
                  <img
                    src={card.img}
                    className="w-full h-72 object-cover group-hover:scale-110 duration-500"
                  />
                  <div className="p-5">
                    <h3 className="text-2xl font-bold">{card.title}</h3>
                    <span className="text-primary font-semibold text-lg mt-3 inline-block">
                      {tExplore} →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* RIGHT BUTTON */}
      <button
        className="absolute right-10 z-20 text-orange-500 text-5xl font-bold top-1/2"
        onClick={() => setActive((p) => (p + 1) % cards.length)}
      >
        ›
      </button>
    </div>

        </div>
      </section>
  )
}

export default CategoryPlaces
