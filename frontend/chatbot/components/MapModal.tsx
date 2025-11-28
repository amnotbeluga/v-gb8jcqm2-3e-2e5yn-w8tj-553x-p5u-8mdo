
import React, { useEffect, useRef, useState } from 'react';
import { X, Map as MapIcon, Save, Trash2 } from 'lucide-react';
import { PREMADE_ITINERARIES } from '../constants';

// Declare Leaflet on window since we are using CDN
declare global {
  interface Window {
    L: any;
  }
}

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (title: string) => void;
}

interface SavedLocation {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const drawnItemsRef = useRef<any>(null);
  const [favorites, setFavorites] = useState<SavedLocation[]>([]);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('jh_tourist_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current || !window.L) return;

    // If map already exists, just invalidate size and return
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
      return;
    }

    // --- Layers ---
    const osm = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    // Google Satellite (approximation using common endpoint)
    const googleSat = window.L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google',
      maxZoom: 20
    });

    // Traffic Overlay (Google Traffic Layer approximation)
    const trafficLayer = window.L.tileLayer('https://mt1.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google Traffic',
      maxZoom: 20,
      opacity: 0.7
    });

    // --- Map Init ---
    // Center on Jharkhand approx
    const map = window.L.map(mapContainerRef.current, {
      center: [23.6102, 85.2799],
      zoom: 8,
      layers: [osm] // Default layer
    });

    mapRef.current = map;

    // --- Layer Control ---
    const baseMaps = {
      "Street View": osm,
      "Satellite": googleSat
    };
    const overlayMaps = {
      "Traffic Info": trafficLayer
    };
    window.L.control.layers(baseMaps, overlayMaps).addTo(map);


    // --- Drawn Items (Custom Routes) ---
    const drawnItems = new window.L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsRef.current = drawnItems;

    // Initialize Draw Control if available
    if (window.L.Control && window.L.Control.Draw) {
      const drawControl = new window.L.Control.Draw({
        edit: {
          featureGroup: drawnItems
        },
        draw: {
          polygon: false,
          circle: false,
          rectangle: false,
          circlemarker: false,
          marker: true, // Allow adding markers
          polyline: {
            shapeOptions: {
              color: '#10b981', // Emerald-500
              weight: 4
            }
          }
        }
      });
      map.addControl(drawControl);

      // Handle Created Items
      map.on(window.L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer;
        const type = e.layerType;

        drawnItems.addLayer(layer);

        if (type === 'marker') {
          const title = prompt("Enter a name for this location to save it as a favorite:");
          if (title) {
            const latLng = layer.getLatLng();
            saveFavorite(title, latLng.lat, latLng.lng);
            layer.bindPopup(`<b>${title}</b><br><span class="text-xs text-gray-500">Custom Favorite</span>`).openPopup();
          }
        } else if (type === 'polyline') {
          layer.bindPopup("Custom Route").openPopup();
        }
      });
    }

    // --- Tourist Spots Markers ---
    const customIcon = window.L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });

    PREMADE_ITINERARIES.forEach((itinerary) => {
      const marker = window.L.marker([itinerary.coordinates.lat, itinerary.coordinates.lng], { icon: customIcon })
        .addTo(map);

      const popupContent = `
        <div class="p-1">
          <h3 class="font-bold text-stone-800 text-sm">${itinerary.location}</h3>
          <p class="text-xs text-stone-500 my-1">${itinerary.title}</p>
          <button 
            id="btn-${itinerary.id}"
            class="bg-emerald-600 text-white text-xs px-3 py-1 rounded mt-1 hover:bg-emerald-700 transition-colors w-full"
          >
            View Plan
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-${itinerary.id}`);
        if (btn) {
          btn.onclick = (e) => {
            e.stopPropagation();
            onSelectLocation(itinerary.title);
            onClose();
          };
        }
      });
    });

    // Force resize calc after render
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOpen, onClose, onSelectLocation]);

  // Effect to re-render favorites when they change
  useEffect(() => {
    if (!mapRef.current || !drawnItemsRef.current) return;

    // Clear existing favorite markers from the drawnItems group to avoid duplicates if we were re-rendering
    // However, strictly speaking, we should manage them separately. 
    // For simplicity in this demo, we will just add new favorites if they aren't there.
    
    // A better approach for favorites rendering:
    favorites.forEach(fav => {
       // Check if we already rendered this favorite? 
       // For now, let's just create a distinct icon for favorites.
       const favIcon = window.L.divIcon({
        className: 'fav-div-icon',
        html: `<div style="background-color: #f59e0b; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
      });
      
      // Check if marker already exists at this location in drawnItems to avoid dupes on re-render
      let exists = false;
      drawnItemsRef.current.eachLayer((layer: any) => {
         const latLng = layer.getLatLng();
         if (layer instanceof window.L.Marker && latLng.lat === fav.lat && latLng.lng === fav.lng) {
             exists = true;
         }
      });

      if (!exists) {
        const marker = window.L.marker([fav.lat, fav.lng], { icon: favIcon });
        marker.bindPopup(`
          <b>${fav.title}</b><br>
          <span class="text-xs text-amber-600">★ Saved Favorite</span>
        `);
        drawnItemsRef.current.addLayer(marker);
      }
    });

  }, [favorites]);

  const saveFavorite = (title: string, lat: number, lng: number) => {
    const newFav: SavedLocation = {
      id: Date.now().toString(),
      title,
      lat,
      lng
    };
    const updated = [...favorites, newFav];
    setFavorites(updated);
    localStorage.setItem('jh_tourist_favorites', JSON.stringify(updated));
  };

  const clearFavorites = () => {
    if (confirm("Are you sure you want to clear all saved favorites?")) {
      setFavorites([]);
      localStorage.removeItem('jh_tourist_favorites');
      if (drawnItemsRef.current) {
        drawnItemsRef.current.clearLayers();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] overflow-hidden shadow-2xl flex flex-col relative">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-emerald-700 text-white">
          <div className="flex items-center gap-3">
            <MapIcon size={20} />
            <div>
              <h2 className="text-lg font-bold leading-none">Interactive Map</h2>
              <p className="text-[10px] opacity-80 mt-1">Draw routes, view traffic, save locations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             {favorites.length > 0 && (
               <button 
                 onClick={clearFavorites}
                 className="flex items-center gap-1 text-xs bg-red-500/20 hover:bg-red-500/40 px-2 py-1 rounded transition-colors text-red-100 border border-red-500/30"
                 title="Clear Favorites"
               >
                 <Trash2 size={12} /> Clear Favs
               </button>
             )}
            <button onClick={onClose} className="p-1 hover:bg-emerald-600 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 bg-stone-100 relative">
           <div ref={mapContainerRef} className="w-full h-full" />
           
           {/* Legend / Instructions */}
           <div className="absolute bottom-6 left-4 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg text-xs text-stone-600 z-[1000] border border-stone-200 max-w-[240px]">
              <h4 className="font-bold text-stone-800 mb-2">Map Guide</h4>
              <div className="flex items-center gap-2 mb-1">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-sm"></div>
                 <span>Tourist Spots</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                 <div className="w-3 h-3 rounded-full bg-amber-500 border border-white shadow-sm"></div>
                 <span>Your Favorites</span>
              </div>
              <hr className="my-2 border-stone-100"/>
              <p>• Use the <b>Draw Toolbar</b> (top left) to add markers or draw routes.</p>
              <p className="mt-1">• Use the <b>Layers Icon</b> (top right) to toggle Satellite/Traffic.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
