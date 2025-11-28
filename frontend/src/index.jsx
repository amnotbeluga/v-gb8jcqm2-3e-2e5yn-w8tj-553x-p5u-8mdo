import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "leaflet/dist/leaflet.css";
import "./fixLeafletIcon";
import LanguageProvider from './context/LanguageContext';
import { CartProvider } from "./context/CartContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LanguageProvider>
  </React.StrictMode>
);

