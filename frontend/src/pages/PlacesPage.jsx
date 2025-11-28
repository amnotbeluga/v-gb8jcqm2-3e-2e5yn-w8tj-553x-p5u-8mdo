import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin } from "lucide-react";

const PlacesPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/places`)
      .then((response) => response.json())
      .then((data) => setPlaces(data))
      .catch((error) => console.error("Error fetching places:", error));
  }, []);

  const handleDelete = async (placeId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data.message);
      // Update the places list after deletion
      setPlaces(places.filter((place) => place._id !== placeId));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative flex justify-center">
            <h1 className="text-3xl font-bold text-center text-primary mb-8">
              Explore Jharkhand&apos;s Beautiful Places
            </h1>

            {isAdmin && (
              <a
                href="/CreatePlaces"
                className="
          btn-primary px-4 py-2 rounded-lg 
          absolute right-0 top-1/2 -translate-y-1/2 
          hidden md:block
        "
              >
                + Add New Place
              </a>
            )}
          </div>

          {/* Mobile Button */}
          {isAdmin && (
            <a
              href="/CreatePlaces"
              className="btn-primary px-4 py-2 rounded-lg mt-2 block md:hidden text-center"
            >
              + Add New Place
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <motion.div
              key={place._id}
              className="card overflow-hidden relative z-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
            y: -10,
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
            scale: 1.02,
          }}
            >
              {/* ---------- ADMIN EDIT/DELETE ICONS ---------- */}
              {isAdmin && (
                <div className="absolute top-3 right-3 flex gap-3">
                  {/* Edit Icon */}
                  <a href={`/EditPlace/${place._id}`}>
                    <svg
                      className="h-6 w-6 text-blue-600 cursor-pointer"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4 21v-3l11-11 3 3-11 11H4zM18 3l3 3-2 2-3-3 2-2z" />
                    </svg>
                  </a>

                  {/* Delete Icon */}
                  <svg
                    onClick={() => handleDelete(place._id)}
                    className="h-6 w-6 text-red-600 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </div>
              )}

              <div className="h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-4">
  <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
  <p className="text-gray-600 mb-4">{place.description}</p>
  <div 
      className="inline-flex items-center space-x-2
                 bg-gray-200 hover:bg-gray-350 
                 text-black font-medium 
                 px-4 py-2 rounded-full 
                 transition-colors duration-200 
                 cursor-pointer mb-2"
    >
      <MapPin size={20} className="text-black" />
      <span>{place.category}</span>
    </div>

  {/* Button Container */}
  <div className="flex flex-col md:flex-row gap-3">

    {/* View Details Button */}
    <a
      href={`/details/${place._id}`}
      className="btn-primary flex-1 flex items-center justify-center gap-2"
    >
      View Details
    </a>
  </div>
</div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* AR/VR Preview Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">
                VR Preview: {selectedPlace.name}
              </h3>
              <button
                onClick={() => setSelectedPlace(null)}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="p-2">
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div
  className="w-full"
  dangerouslySetInnerHTML={{ __html: selectedPlace.arembed }}
/>
                  <p className="mt-2 text-sm text-gray-600">
                    In the full version, this would be an interactive 360° view
                    or AR experience of {selectedPlace.name}.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setSelectedPlace(null)}
                className="btn-primary"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PlacesPage;
