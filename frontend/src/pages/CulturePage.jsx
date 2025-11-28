import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CulturePage = () => {
  const [selectedCulture, setSelectedCulture] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;
   // Demo places data
  const cultures = [
    {
      id: 1,
      name: 'Santhal Community',
      description: 'The Santhal are one of the largest tribal communities in Jharkhand, known for their vibrant festivals, traditional dances like the Santhali dance, and unique customs.',
      image: 'https://th-thumbnailer.cdn-si-edu.com/b2oWqzrJ8sOOZihxTaM5ap7idkA=/fit-in/1072x0/https://tf-cmsv2-photocontest-smithsonianmag-prod-approved.s3.amazonaws.com/bd03f374-ce76-4477-922b-c970e034cea1.jpg',
      wekia: 'https://en.wikipedia.org/wiki/Santal_people',
      category: 'Tribal Culture',
    },
    {
      id: 2,
      name: 'Munda Community',
      description: 'The Munda tribe has a rich cultural heritage with traditional music, dance forms like the Munda dance, and festivals such as Mage Parab that celebrate their connection to nature.',
      image: 'https://mundariversity.com/wp-content/uploads/2025/03/6035572bd61c39300c308878_12pcKEBGASNEER7lsebTXQvNQg54yRRFv521zg4BIBj0ZDbUgwRwxORYxlAxcvHgE4Mo_qgR8RnfSYe3N18JYAOwloy-U_0jsR0fGYPIAVoTvwH7RA2dhA7bUL9jvBKWjdcpCJrS-1-1024x576.jpeg',
      wekia: 'https://en.wikipedia.org/wiki/Munda_people',
      category: 'Tribal Culture',
    },
    {
      id: 3,
      name: 'Oraon Community',
      description: 'The Oraon tribe is known for their traditional dances, music, and festivals like Sarhul that celebrate nature and community.',
      image: 'https://3.bp.blogspot.com/-gTGeW60HYig/WQQWC11jQfI/AAAAAAAAACM/t59SfkYMx_w293bIdxa3_9Enna4cNMdDwCLcB/w1200-h630-p-k-no-nu/Oraon%2BCommunity%2B%25282%2529.jpg',
      wekia: 'https://en.wikipedia.org/wiki/Oraon_people',
      category: 'Tribal Culture',
    },
    {
      id: 4,
      name: 'Chhau Dance',
      description: 'The Chhau dance is a traditional dance form of Jharkhand that combines martial arts, storytelling, and vibrant costumes. It is performed during festivals and special occasions.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Chhau_Nritya_%281%29.jpg/1920px-Chhau_Nritya_%281%29.jpg',
      wekia: 'https://en.wikipedia.org/wiki/Chhau_dance',
      category: 'Folk Dance',
    },
    {
      id: 5,
      name: 'Jharkhand Cuisine',
      description: 'Jharkhand cuisine features traditional dishes like Litti Chokha, Dhuska, and Thekua, which are made from locally sourced ingredients and reflect the region\'s agricultural heritage.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQunAjeSCuPzGDDU4MOs2CutdkdWrDCna3lfg&s',
      wekia: 'https://en.wikipedia.org/wiki/Jharkhandi_cuisine',
      category: 'Cuisine',
    },
    {
      id: 6,
      name: 'Paika Dance',
      description: 'Paika dance is a traditional martial dance form of Jharkhand, performed by the Paika community. It showcases their valor and agility through energetic movements and rhythmic beats.',
      image: 'https://i.pinimg.com/736x/2d/af/0b/2daf0bba6b5bbb7be02f19d09986e423.jpg',
      wekia: 'https://en.wikipedia.org/wiki/Paika_dance',
      category: 'Folk Dance',
    },
  ]; 

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative flex justify-center">
            <h1 className="text-3xl font-bold text-center text-primary mb-8">
              Explore Jharkhand&apos;s Culture and Food
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cultures.map((culture) => (
            <motion.div
              key={culture.id}
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
  );
};

export default CulturePage;
