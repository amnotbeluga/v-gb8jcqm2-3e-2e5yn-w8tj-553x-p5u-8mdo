import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MapPin } from "lucide-react";

function HillStation() {
  const [places, setPlaces] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.isAdmin;
  
    useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/places`)
      .then((res) => res.json())
      .then((data) => {
        const HillStations = data.filter(
  (place) =>
    place.category &&
    place.category.toLowerCase() === "hill station"
);

        setPlaces(HillStations);
      })
      .catch((error) => console.error("Error fetching places:", error));
  }, []);
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this place?")) return;
  
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/places/${id}`, {
        method: "DELETE",
      });
  
      setPlaces((prev) => prev.filter((p) => p._id !== id));
    };

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          Beautiful Hill Station of Jharkhand
        </h1>

        {isAdmin && (
          <a href="/CreatePlaces" className="btn-primary mb-6 block text-center">
            + Add New Hill Station
          </a>
        )}

        {/* Waterfall Places */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <motion.div
              key={place._id}
              className="border rounded-lg shadow-lg overflow-hidden relative bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">{place.name}</h2>

                <p className="text-gray-700 mt-2 line-clamp-3">
                  {place.description}
                </p>

                <div className="flex items-center gap-2 mt-3 text-primary">
                  <MapPin size={18} />
                  <span>{place.location}</span>
                </div>

                <a
                  href={`/details/${place._id}`}
                  className="btn-primary mt-4 block text-center"
                >
                  View Details
                </a>

                {isAdmin && (
                  <div className="flex justify-between mt-4">

                    <a href={`/EditPlace/${place._id}`} className="text-blue-600">
                      Edit
                    </a>

                    <button
                      onClick={() => handleDelete(place._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default HillStation
