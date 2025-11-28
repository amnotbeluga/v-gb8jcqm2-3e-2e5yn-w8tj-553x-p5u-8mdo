import React, { useState, useEffect } from 'react';
import { UserInput } from '../types';
import { INTERESTS } from '../constants';
import { MapPin, Calendar, Sparkles, Bus } from 'lucide-react';
import { getTranslation } from '../translations';

interface ItineraryFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
  language: string;
}

// Helper for vehicle logic - returns emoji string
const getVehicleEmoji = (count: number) => {
  if (count === 1) return "🚲"; // Cycle
  if (count === 2) return "🛵"; // Scooter
  if (count === 3) return "🛺"; // Auto
  if (count === 4) return "🚕"; // Taxi
  if (count === 5) return "🚗"; // Car
  if (count === 6) return "🚙"; // SUV
  if (count === 7) return "🚐"; // Mini Bus
  if (count === 8) return "🚐"; // Mini Bus
  if (count === 9) return "🚌"; // Bus
  if (count === 10) return "🚌"; // Bus
  return "🚌";
};

export const ItineraryForm: React.FC<ItineraryFormProps> = ({ onSubmit, isLoading, language }) => {
  // Initialize dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<UserInput>({
    start_city: 'Ranchi',
    startDate: today,
    endDate: tomorrow,
    interests: [],
    budgetType: 'preset',
    budgetLevel: 'mid',
    customBudgetMin: 2000,
    customBudgetMax: 5000,
    travellers: 2,
  });

  const [showCustomTravelerInput, setShowCustomTravelerInput] = useState(false);
  const t = (key: string) => getTranslation(language, key);

  // Reset custom input if selection drops below 11
  useEffect(() => {
    if (formData.travellers <= 10) {
      setShowCustomTravelerInput(false);
    }
  }, [formData.travellers]);

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full mx-auto border border-primary-100">
      <div className="flex items-center gap-2 mb-6 text-primary-700">
        <Sparkles className="w-6 h-6" />
        <h2 className="text-2xl font-bold">{t('planJourney')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* City & Dates */}
        <div className="grid grid-cols-1 gap-6">
           <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin size={16} /> {t('startCity')}
            </label>
            <input
              type="text"
              value={formData.start_city}
              onChange={e => setFormData({ ...formData, start_city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Ranchi, Jamshedpur"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={16} /> {t('startDate')}
              </label>
              <input
                type="date"
                min={today}
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={16} /> {t('endDate')}
              </label>
              <input
                type="date"
                min={formData.startDate}
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Travelers - Visual Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">{t('selectTravellers')}</label>
          
          {!showCustomTravelerInput ? (
            <div className="flex overflow-x-auto pb-6 pt-2 gap-3 no-scrollbar snap-x px-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData({ ...formData, travellers: num })}
                  className={`flex-shrink-0 w-18 h-18 p-4 rounded-2xl border-2 flex items-center justify-center transition-all snap-center relative group ${
                    formData.travellers === num
                      ? 'border-primary-500 bg-primary-50 shadow-lg scale-105 z-10'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
                  }`}
                  title={`${num} ${t('travellers')}`}
                >
                  <span className="text-4xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-200">
                    {getVehicleEmoji(num)}
                  </span>
                  
                  {/* Number Badge */}
                  <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-md transition-colors ${
                     formData.travellers === num 
                       ? 'bg-primary-600 text-white' 
                       : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600'
                  }`}>
                    {num}
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, travellers: 11 });
                  setShowCustomTravelerInput(true);
                }}
                className="flex-shrink-0 w-18 h-18 p-4 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-primary-400 hover:text-primary-600 transition-all snap-center group"
              >
                 <span className="text-lg font-bold group-hover:scale-110 transition-transform">10+</span>
              </button>
            </div>
          ) : (
             <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 flex items-center gap-4">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Bus className="text-primary-600" size={24} />
                </div>
                <div className="flex-grow">
                  <label className="text-xs font-bold text-primary-700 uppercase">{t('travellers')}</label>
                  <input 
                    type="number" 
                    min="11" 
                    value={formData.travellers}
                    onChange={(e) => setFormData({...formData, travellers: parseInt(e.target.value) || 11})}
                    className="w-full bg-transparent text-lg font-bold text-gray-800 outline-none border-b border-primary-300 focus:border-primary-600"
                    autoFocus
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setShowCustomTravelerInput(false);
                    setFormData({...formData, travellers: 10});
                  }}
                  className="text-sm text-gray-500 underline hover:text-primary-600"
                >
                  Show Icons
                </button>
             </div>
          )}
          <div className="flex justify-center -mt-2">
             <div className="text-sm font-medium text-primary-700">
                {formData.travellers} {t('travellers')}
             </div>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 block">{t('budgetPerPerson')}</label>
          <div className="flex rounded-lg bg-gray-100 p-1">
             <button
                type="button"
                onClick={() => setFormData({ ...formData, budgetType: 'preset' })}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                   formData.budgetType === 'preset' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
             >
               {t('presets')}
             </button>
             <button
                type="button"
                onClick={() => setFormData({ ...formData, budgetType: 'custom' })}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                   formData.budgetType === 'custom' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
             >
               {t('customRange')}
             </button>
          </div>

          {formData.budgetType === 'preset' ? (
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: 'low', label: t('budgetLow'), sub: t('budgetLowSub'), range: '₹800 - ₹2000' }, 
                { val: 'mid', label: t('budgetMid'), sub: t('budgetMidSub'), range: '₹2500 - ₹5000' }, 
                { val: 'high', label: t('budgetHigh'), sub: t('budgetHighSub'), range: '₹6000+' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setFormData({ ...formData, budgetLevel: opt.val as any })}
                  className={`border rounded-xl p-3 text-left transition-all relative overflow-hidden ${
                    formData.budgetLevel === opt.val
                      ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500 shadow-md'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className={`font-bold ${formData.budgetLevel === opt.val ? 'text-primary-700' : 'text-gray-700'}`}>
                    {opt.label}
                  </div>
                  <div className="text-xs text-gray-500">{opt.sub}</div>
                  
                  {/* Approx Amount - Shown only when active */}
                  {formData.budgetLevel === opt.val && (
                    <div className="mt-2 pt-2 border-t border-primary-200 text-xs font-bold text-primary-800 animate-fade-in">
                      ~{opt.range} / day
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t('min')} (INR)</label>
                <input 
                   type="number"
                   value={formData.customBudgetMin}
                   onChange={(e) => setFormData({ ...formData, customBudgetMin: parseInt(e.target.value) || 0 })}
                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t('max')} (INR)</label>
                <input 
                   type="number"
                   value={formData.customBudgetMax}
                   onChange={(e) => setFormData({ ...formData, customBudgetMax: parseInt(e.target.value) || 0 })}
                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Interests */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">{t('interests')}</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  formData.interests.includes(interest)
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          {formData.interests.length === 0 && (
             <p className="text-xs text-orange-500">Please select at least one interest</p>
          )}
        </div>

        {/* Language Selector Removed from Form - Now in App Header */}

        <button
          type="submit"
          disabled={isLoading || formData.interests.length === 0}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all flex justify-center items-center gap-3 ${
            isLoading || formData.interests.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-1 hover:shadow-primary-200'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('generating')}
            </>
          ) : (
            t('generate')
          )}
        </button>
      </form>
    </div>
  );
};