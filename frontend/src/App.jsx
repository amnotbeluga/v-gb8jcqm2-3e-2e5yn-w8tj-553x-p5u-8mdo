import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import ItineraryPlanner from './pages/ItineraryPlanner';
import PlacesPage from './pages/PlacesPage';
import MarketplacePage from './pages/MarketplacePage';
import FeedbackPage from './pages/FeedbackPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePlaces from './pages/CreatePlaces';
import EditPlace from './pages/EditPlace';
import PlaceDetailsPage from './pages/PlaceDetailsPage';
import CartPage from './pages/CartPage';
import CulturePage from './pages/CulturePage';
import WaterFallPage from './pages/Category/WaterFallPage';
import HillStation from './pages/Category/HillStation';
import Valley from './pages/Category/Valley';
import Park from './pages/Category/Park';
import Temple from './pages/Category/Temple';
import FamousCities from './pages/Category/FamousCities';
import TribalCulture from './pages/Visit/TribalCulture';
import FolkDance from './pages/Visit/FolkDance';
import Cuisine from './pages/Visit/Cuisine';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/itinerary" element={<ItineraryPlanner />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/waterfall" element={<WaterFallPage />} />
        <Route path="/HillStation" element={<HillStation />} />
        <Route path='/valley' element={<Valley />} />
        <Route path='/park' element={<Park />} />
        <Route path='/temples' element={<Temple />} />
        <Route path='/famousCities' element={<FamousCities />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/CreatePlaces" element={<CreatePlaces />} />
        <Route path="/EditPlace/:id" element={<EditPlace />} />
        <Route path="/details/:id" element={<PlaceDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="/tribalculture" element={<TribalCulture />} />
        <Route path="/folkdance" element={<FolkDance />} />
        <Route path="/cuisine" element={<Cuisine />} />
      </Routes>
    </Router>
  );
}

export default App;
