import React, { useState, useMemo } from 'react';
import { X, MapPin, Calendar, Search, Compass } from 'lucide-react';
import { PREMADE_ITINERARIES } from '../constants';

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItinerary: (itineraryTitle: string) => void;
}

const LOCATIONS = Array.from(new Set(PREMADE_ITINERARIES.map(i => i.location))).sort();
const INTERESTS = Array.from(new Set(PREMADE_ITINERARIES.flatMap(i => i.interests))).sort();

export const ItineraryModal: React.FC<ItineraryModalProps> = ({ isOpen, onClose, onSelectItinerary }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const filteredItineraries = useMemo(() => {
    return PREMADE_ITINERARIES.filter(item => {
      // Filter by Location
      if (selectedLocation !== 'All' && item.location !== selectedLocation) return false;
      
      // Filter by Duration
      if (selectedDuration !== 'All') {
        if (selectedDuration === '1 Day' && item.duration !== 1) return false;
        if (selectedDuration === '2-3 Days' && (item.duration < 2 || item.duration > 3)) return false;
        if (selectedDuration === '4+ Days' && item.duration < 4) return false;
      }

      // Filter by Interests (must match at least one if any selected)
      if (selectedInterests.length > 0) {
        const hasMatch = item.interests.some(i => selectedInterests.includes(i));
        if (!hasMatch) return false;
      }

      return true;
    });
  }, [selectedLocation, selectedDuration, selectedInterests]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex justify-between items-center bg-emerald-600 text-white">
          <div className="flex items-center gap-2">
            <Compass size={24} />
            <h2 className="text-xl font-bold">Find Your Trip</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-500 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Filters */}
        <div className="p-5 border-b border-stone-100 bg-stone-50 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location Filter */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-stone-500 uppercase">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Locations</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>

            {/* Duration Filter */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-stone-500 uppercase">Duration</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                <select 
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">Any Duration</option>
                  <option value="1 Day">1 Day</option>
                  <option value="2-3 Days">2-3 Days</option>
                  <option value="4+ Days">4+ Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interests Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-stone-500 uppercase">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-all border
                    ${selectedInterests.includes(interest)
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-400'}
                  `}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-5 bg-stone-50/50">
          <h3 className="text-sm font-semibold text-stone-500 mb-3">
            {filteredItineraries.length} {filteredItineraries.length === 1 ? 'Result' : 'Results'} Found
          </h3>
          
          <div className="grid gap-4">
            {filteredItineraries.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  onSelectItinerary(item.title);
                  onClose();
                }}
                className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex justify-between items-center"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-stone-800 group-hover:text-emerald-700">{item.title}</h4>
                  <p className="text-sm text-stone-500 mt-1">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-600">
                      <MapPin className="w-3 h-3 mr-1" /> {item.location}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-600">
                      <Calendar className="w-3 h-3 mr-1" /> {item.duration} Day{item.duration > 1 ? 's' : ''}
                    </span>
                    {item.interests.map(i => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Search size={16} />
                  </div>
                </div>
              </div>
            ))}

            {filteredItineraries.length === 0 && (
              <div className="text-center py-10">
                <p className="text-stone-400 mb-4">No existing itineraries match your filters.</p>
                <button
                  onClick={() => {
                    onSelectItinerary(`Create a custom itinerary for ${selectedLocation !== 'All' ? selectedLocation : 'Jharkhand'} for ${selectedDuration !== 'All' ? selectedDuration : '2 days'} focusing on ${selectedInterests.length ? selectedInterests.join(', ') : 'popular sights'}`);
                    onClose();
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
                >
                  Ask AI to Plan It
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};