
import React from 'react';
import { Map as MapIcon, Leaf, Globe, Menu, Search } from 'lucide-react';
import { LANGUAGE_OPTIONS } from '../constants';
import { Language } from '../types';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenMap: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange, onToggleSidebar, onOpenSearch, onOpenMap }) => {
  return (
    <header className="bg-emerald-700 text-white p-4 shadow-md sticky top-0 z-40 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-emerald-600 rounded-lg transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="bg-white p-2 rounded-full shadow-sm hidden sm:block">
          <Leaf className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide flex items-center gap-2">
            <span className="sm:hidden">JH Tourist AI</span>
            <span className="hidden sm:inline">YatraMitra AI 🧭</span>
          </h1>
          <p className="text-xs text-emerald-100 opacity-90 hidden sm:block">Your Multilingual Travel Guide</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Map Button */}
        <button
          onClick={onOpenMap}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-800/50 hover:bg-emerald-600 text-white rounded-full text-xs sm:text-sm font-medium transition-colors border border-emerald-500/50"
          title="View Map"
        >
          <MapIcon size={14} />
          <span className="hidden xs:inline">Map</span>
        </button>

        {/* Search / Find Plans Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs sm:text-sm font-medium transition-colors border border-emerald-500"
        >
          <Search size={14} />
          <span className="hidden xs:inline">Find Plans</span>
        </button>

        {/* Language Selector */}
        <div className="relative flex items-center bg-emerald-800 rounded-full px-2 py-1.5 border border-emerald-600 max-w-[140px] sm:max-w-[200px]">
          <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-100 mr-1 flex-shrink-0" />
          <select 
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none appearance-none cursor-pointer w-full truncate"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-stone-800 bg-white">
                {opt.flag} {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};