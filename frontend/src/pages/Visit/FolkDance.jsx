import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function FolkDance() {
  const [cultures, setCultures] = useState([]);
    const [selectedCulture, setSelectedCulture] = useState(null);
   useEffect(() => {
    const category = encodeURIComponent("Folk Dance");
  
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cultures/category/${category}`)
      .then(res => res.json())
      .then(data => setCultures(data))
      .catch(err => console.error("Error fetching culture:", err));
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative flex justify-center">
            <h1 className="text-3xl font-bold text-center text-primary mb-8">
              Explore Jharkhand&apos;s  Folk Dances
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cultures.map((culture) => (
            <motion.div
              key={culture._id}
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

              <div className="relative h-48 overflow-hidden">
                <img
                  src={culture.image}
                  alt={culture.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div 
      className="absolute bottom-0 right-0 inline-flex items-center space-x-2
                 bg-gray-200 hover:bg-gray-350 
                 text-black font-medium 
                 px-4 py-2 rounded-tl-lg 
                 transition-colors duration-200 
                 cursor-pointer"
    >
      
      <span>{culture.category}</span>
    </div>
              </div>

              <div className="p-4">
  <h3 className="text-xl font-semibold mb-2">{culture.name}</h3>
  <p className="text-gray-600 mb-4">{culture.description}<a href={culture.wekia} className="text-blue-500 ml-2 cursor-pointer">read more...</a></p>
  

  {/* Button Container */}
  <div className="flex space-x-4 mt-4">

    {/* Preview Button */}
    <button
      onClick={() => setSelectedCulture(culture)}
      className="btn-primary flex-1 flex items-center justify-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>
      Preview image
    </button>
  </div>
</div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* AR/VR Preview Modal */}
      {selectedCulture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">
                Image Preview: {selectedCulture.name}
              </h3>
              <button
                onClick={() => setSelectedCulture(null)}
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
                  <img src={selectedCulture.image} alt={selectedCulture.name} className="w-full h-auto rounded-lg shadow" />
                </div>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setSelectedCulture(null)}
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
  )
}

export default FolkDance
