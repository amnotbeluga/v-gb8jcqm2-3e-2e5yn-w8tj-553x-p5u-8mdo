import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Smart Tourism Jharkhand</h3>
          <p className="text-gray-300">
            Discover the beauty, culture, and heritage of Jharkhand through our smart tourism platform.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/itinerary" className="text-gray-300 hover:text-white transition-colors">
                Plan Your Trip
              </Link>
            </li>
            <li>
              <Link to="/places" className="text-gray-300 hover:text-white transition-colors">
                Explore Places
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="text-gray-300 hover:text-white transition-colors">
                Marketplace
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-300 mb-2">Email: info@smarttourismjharkhand.com</p>
          <p className="text-gray-300">Phone: +91 1234567890</p>
        </div>
      </div>
      
      
    </footer>
  );
};

export default Footer;