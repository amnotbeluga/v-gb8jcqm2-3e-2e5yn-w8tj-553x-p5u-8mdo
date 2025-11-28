import React from "react";
import { useState, useRef } from "react";
import myvideo from "../../assets/video1.mp4";
import bg from "../../assets/bg-Video.jpg";
import { Play, Pause } from "lucide-react";
function VideoBanner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current.play();
    }, 300);
  };

  const handlePauseToggle = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <section className="bg-white">
      <div
        className="relative  min-h-[85vh] bg-cover bg-center flex items-center mr-2"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-8xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-10 py-20 bg-transparent bg-black bg-opacity-70">
          {/* LEFT SIDE CONTENT */}
          <div className="text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Experience Jharkhand Like <br /> Never Before
            </h1>

            <p className="mt-6 text-lg leading-relaxed">
              Immerse yourself in the rich traditions of the Santhal and Munda
              tribes. Dance to the rhythm of the mandar, taste the earthy
              flavors of dhuska, and let the waterfalls wash away your worries.
            </p>

            {/* PLAY BUTTON */}
            <button
              onClick={handlePlay}
              className="mt-8 flex items-center gap-3 text-white font-semibold"
            >
              <span className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                <Play className="w-6 h-6" />
              </span>
              Watch Full Documentary
            </button>
          </div>

          {/* RIGHT SIDE — IMAGE OR VIDEO */}
          <div className="relative rounded-xl overflow-hidden shadow-xl h-[300px] md:h-[350px] bg-black">
            {/* BEFORE PLAY → IMAGE */}
            {!isPlaying && (
              <video
                className="w-full h-full object-cover"
                src={myvideo}
              ></video>
            )}

            {/* AFTER PLAY → VIDEO */}
            {isPlaying && (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={myvideo}
                />

                {/* PAUSE/PLAY BUTTON ON VIDEO */}
                <button
                  onClick={handlePauseToggle}
                  className="
                absolute bottom-4 left-4 bg-black/60 text-white 
                p-3 rounded-full backdrop-blur-md"
                >
                  {videoRef.current?.paused ? (
                    <Play className="w-6 h-6" />
                  ) : (
                    <Pause className="w-6 h-6" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoBanner;
