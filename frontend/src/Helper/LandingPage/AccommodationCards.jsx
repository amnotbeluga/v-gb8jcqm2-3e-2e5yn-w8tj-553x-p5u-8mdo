import React from "react";

export default function AccommodationCards() {
  const cards = [
    {
      title: "Home Stays",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKH2PzkPH-FyYozhLShWzWEhB4mAC_Vjfmw&s",
      link: "#",
    },
    {
      title: "Heritage Hotels",
      img: "https://png.pngtree.com/thumb_back/fh260/background/20220311/pngtree-bedroom-guest-room-five-star-hotel-image_990205.jpg",
      link: "#",
    },
    {
      title: "Events",
      img: "https://img.freepik.com/free-vector/flat-background-holi-festival-celebration_23-2151197790.jpg?semt=ais_hybrid&w=740&q=80",
      link: "#",
    },
  ];

  return (
    <div className="h-screen w-full bg-cover bg-center p-10" style={{ backgroundImage: `url('https://media.istockphoto.com/id/2152670211/photo/empty-wooden-table-orange-bed-and-mockup-dark-green-wall-in-bedroom-interior-3d-rendering.jpg?s=612x612&w=0&k=20&c=7VULnwSsujWGolebD68R6SdZrzrxv0wKyHxCSPz1EN4=')` }}>
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 drop-shadow-lg mt-4">
        Your Next Getaway - Book Stays & Events
      </h1>
      <div className="w-56 h-1 bg-yellow-100 mx-auto mb-12"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" style={{ height: '460px' }}>
        {cards.map((c, i) => (
          <a
            key={i}
            href={c.link}
            className="relative group rounded-2xl overflow-hidden shadow-xl cursor-pointer"
          >
            <img
              src={c.img}
              alt={c.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-50"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 bg-transparent bg-black bg-opacity-70">
              <h2 className="text-2xl font-semibold text-white mb-4 drop-shadow-lg text-center">
                {c.title}
              </h2>
              <button className="px-6 py-4 absolute bottom-2  text-yellow-200 rounded-full font-semibold shadow-lg group-hover:scale-105 transition">
                BOOK NOW
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
