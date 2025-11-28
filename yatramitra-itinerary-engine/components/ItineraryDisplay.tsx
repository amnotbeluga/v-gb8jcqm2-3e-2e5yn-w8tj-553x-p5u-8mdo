import React, { useState, useRef, useEffect } from 'react';
import { ItineraryResponse, DayPlan, ItineraryItem } from '../types';
import { MapPin, IndianRupee, AlertTriangle, CheckCircle, Navigation, Car, Shield, ExternalLink, Calendar, MessageCircle, Send, Sparkles, Hotel, Train, Plane, Bus, Share2 } from 'lucide-react';
import { askQuestionAboutItinerary } from '../services/geminiService';
import { getTranslation } from '../translations';

interface ItineraryDisplayProps {
  data: ItineraryResponse;
  onNew: () => void;
  onSave: () => void;
  isSaved: boolean;
  currentLanguage: string;
}

const ItemCard: React.FC<{ item: ItineraryItem }> = ({ item }) => {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(item.place_name + " Jharkhand")}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="ml-8 relative pb-12 last:pb-0">
      <div className="absolute -left-[41px] top-0 h-full w-0.5 bg-gray-200 last:hidden"></div>
      <div className="absolute -left-[46px] top-1 h-3 w-3 rounded-full border-2 border-primary-500 bg-white"></div>
      
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden relative">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none z-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23206f47' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>

        <div className="p-5 relative z-10">
           <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <h4 className="text-xl font-bold text-gray-800">{item.place_name}</h4>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded uppercase tracking-wide border border-primary-100">
                    {item.time_block}
                  </span>
                  <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded uppercase tracking-wide border border-orange-100">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500 flex items-center gap-1 mt-1 bg-white px-2 py-1 rounded border border-gray-200">
                 <IndianRupee size={14} /> {item.estimated_cost_range_inr}
              </div>
           </div>

          <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-500 mb-4 bg-gray-50/80 p-3 rounded-lg backdrop-blur-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Car size={16} className="text-gray-400" />
              <span>{item.approx_travel_time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation size={16} className="text-gray-400" />
              <span>{item.approx_distance_km} km</span>
            </div>
          </div>

          {item.safety_notes.length > 0 && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100 mb-4">
              <div className="flex items-center gap-2 font-semibold mb-1">
                <AlertTriangle size={16} />
                <span>Safety First</span>
              </div>
              <ul className="list-disc list-inside pl-1 space-y-1">
                {item.safety_notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Map Embed */}
          <div className="rounded-lg overflow-hidden border border-gray-200 h-48 bg-gray-50 relative group">
             <iframe 
               title={`Map of ${item.place_name}`}
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight={0} 
               marginWidth={0} 
               src={mapUrl}
               className="filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
             ></iframe>
             <div className="absolute bottom-2 right-2">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.place_name + " Jharkhand")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-xs font-bold px-2 py-1 rounded shadow flex items-center gap-1 text-blue-600 hover:bg-blue-50"
                >
                  Open <ExternalLink size={10} />
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DayCard: React.FC<{ dayPlan: DayPlan }> = ({ dayPlan }) => (
  <div className="mb-10">
    <div className="sticky top-0 z-10 bg-slate-50 py-4 mb-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-primary-800 flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white text-lg font-bold shadow-lg">
            {dayPlan.day}
          </span>
          {dayPlan.title}
        </h3>
        {dayPlan.date && (
          <span className="text-sm font-semibold text-gray-500 flex items-center gap-1 bg-white px-3 py-1 rounded-full border">
             <Calendar size={14} /> {new Date(dayPlan.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        )}
      </div>
      <p className="ml-14 text-sm font-medium text-gray-500 flex items-center gap-1 mt-1">
        <IndianRupee size={14} /> Estimated Day Cost: {dayPlan.day_estimated_cost_range_inr}
      </p>
    </div>
    
    <div className="pl-4">
      {dayPlan.items.map((item, idx) => (
        <ItemCard key={idx} item={item} />
      ))}
    </div>
  </div>
);

const AIAssistant: React.FC<{ itinerary: ItineraryResponse, language: string }> = ({ itinerary, language }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isAsking, setIsAsking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = (key: string) => getTranslation(language, key);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isAsking) return;

    const userQ = question;
    setQuestion('');
    setMessages(prev => [...prev, { role: 'user', text: userQ }]);
    setIsAsking(true);

    try {
      const answer = await askQuestionAboutItinerary(itinerary, userQ);
      setMessages(prev => [...prev, { role: 'ai', text: answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I couldn't process that request right now." }]);
    } finally {
      setIsAsking(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white rounded-xl border border-primary-100 shadow-lg overflow-hidden mt-8 mb-12">
      <div className="bg-primary-50 p-4 border-b border-primary-100 flex items-center gap-2">
        <Sparkles className="text-primary-600" size={20} />
        <h3 className="font-bold text-primary-800">{t('askAi')}</h3>
      </div>
      
      <div className="h-64 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-8">
            <MessageCircle className="mx-auto mb-2 opacity-50" size={32} />
            <p>Have questions about this trip?</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
              msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isAsking && (
          <div className="flex justify-start">
             <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 rounded-tl-none shadow-sm">
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleAsk} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t('askPlaceholder')}
          className="flex-grow px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
        <button 
          type="submit" 
          disabled={!question.trim() || isAsking}
          className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ data, onNew, onSave, isSaved, currentLanguage }) => {
  const t = (key: string) => getTranslation(currentLanguage, key);

  const handleShare = async () => {
    const textToShare = `${data.summary_text}\n\nTotal Cost: ${data.total_estimated_cost_range_inr}`;
    const title = `YatraMitra Itinerary: ${data.ui_suggestions.tags[0] || 'Jharkhand Trip'}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: textToShare,
          // url: window.location.href // Optional: if you had permalinks
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(textToShare);
      alert(t('copied'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Actions */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-4 z-20">
        <button 
          onClick={onNew}
          className="px-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors"
        >
          ← {t('createNew')}
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center gap-2 font-medium"
            title={t('share')}
          >
            <Share2 size={20} />
            <span className="hidden sm:inline">{t('share')}</span>
          </button>
          <button 
            onClick={onSave}
            disabled={isSaved}
            className={`px-6 py-2 rounded-lg font-bold shadow-sm transition-all ${
              isSaved 
                ? 'bg-green-100 text-green-700 cursor-default' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isSaved ? t('saved') : t('save')}
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-primary-800 to-primary-600 text-white p-8 rounded-2xl shadow-xl mb-10">
        <div className="flex justify-between items-start mb-4">
           <h2 className="text-3xl font-bold mb-4">{t('summaryTitle')}</h2>
           <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {data.language.toUpperCase()}
           </span>
        </div>
        <p className="text-lg leading-relaxed text-primary-50 mb-6">{data.summary_text}</p>
        
        <div className="flex flex-wrap gap-4 text-sm font-medium bg-white/10 p-4 rounded-xl backdrop-blur-sm">
           <div className="flex items-center gap-2">
             <IndianRupee size={16} /> {t('total')}: {data.total_estimated_cost_range_inr}
           </div>
           <div className="flex items-center gap-2">
             <MapPin size={16} /> {data.itinerary.length} {t('days')}
           </div>
        </div>
      </div>

      {/* Arrival Logistics & Accommodation Guide - NEW */}
      {data.arrival_logistics && (
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm mb-10 overflow-hidden">
          <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2 text-blue-800">
            <Hotel size={20} />
            <h3 className="font-bold text-lg">{t('hotelGuide')}</h3>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3 mb-6">
               <div className="mt-1 text-blue-600">
                 {data.arrival_logistics.arrival_mode.toLowerCase().includes('flight') ? <Plane size={20} /> : 
                  data.arrival_logistics.arrival_mode.toLowerCase().includes('train') ? <Train size={20} /> : <Bus size={20} />}
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">{data.arrival_logistics.arrival_mode}</h4>
                 <p className="text-gray-600 text-sm mt-1">{data.arrival_logistics.advice}</p>
               </div>
            </div>

            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Recommended Stays</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {data.arrival_logistics.recommended_hotels?.map((hotel, idx) => (
                 <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-gray-800">{hotel.name}</h5>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-1.5 py-0.5 rounded">{hotel.rating}</span>
                    </div>
                    <div className="text-xs font-medium text-blue-600 mt-1 mb-2">{hotel.location_note}</div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">{hotel.description}</p>
                    <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                      <IndianRupee size={12} /> {hotel.approx_price}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* Days */}
      <div className="space-y-4">
        {data.itinerary.map((day) => (
          <DayCard key={day.day} dayPlan={day} />
        ))}
      </div>

      {/* AI Assistant Section */}
      <AIAssistant itinerary={data} language={currentLanguage} />

      {/* Checklist & General Safety */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-20">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="text-primary-500" /> {t('checklist')}
          </h3>
          <ul className="space-y-2">
            {data.recommended_checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="text-orange-500" /> {t('safety')}
          </h3>
          <ul className="space-y-2">
            {data.general_safety_notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};