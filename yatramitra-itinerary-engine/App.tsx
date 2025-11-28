import React, { useState, useEffect } from 'react';
import { HistorySidebar } from './components/HistorySidebar';
import { ItineraryForm } from './components/ItineraryForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { ItineraryResponse, UserInput } from './types';
import { generateItinerary } from './services/geminiService';
import { Menu, Compass, Globe } from 'lucide-react';
import { LANGUAGES } from './constants';
import { getTranslation } from './translations';

const STORAGE_KEY = 'yatramitra_history';

const App: React.FC = () => {
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ItineraryResponse[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [language, setLanguage] = useState('en'); // Global Language State

  // Load history on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleGenerate = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    setIsSaved(false);
    try {
      // Pass the global language to the service
      const inputWithLang = { ...input, language };
      const result = await generateItinerary(inputWithLang);
      setCurrentItinerary(result);
    } catch (err) {
      setError(getTranslation(language, 'error') || "Failed to generate itinerary.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!currentItinerary) return;
    
    const exists = history.some(h => h.id === currentItinerary.id);
    
    if (!exists) {
      const newHistory = [currentItinerary, ...history];
      setHistory(newHistory);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setIsSaved(true);
    }
  };

  const handleDeleteHistory = (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const handleSelectHistory = (item: ItineraryResponse) => {
    setCurrentItinerary(item);
    setIsSidebarOpen(false);
    // When selecting history, update the global language to match the history item
    setLanguage(item.language);
    setIsSaved(true);
    setError(null);
  };

  const handleNew = () => {
    setCurrentItinerary(null);
    setIsSaved(false);
    setError(null);
  };

  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="min-h-screen bg-slate-50 relative flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleNew}
          >
            <Compass className="text-primary-600 h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">YatraMitra</h1>
              <p className="text-xs text-primary-600 font-medium">Jharkhand Tourism AI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Selector in Header */}
            <div className="relative group hidden sm:block">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 cursor-pointer hover:border-primary-300">
                <Globe size={16} className="text-gray-600" />
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 appearance-none cursor-pointer w-24"
                  disabled={isLoading}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                       {lang.label.split(' ')[0]} {lang.flag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="font-bold">{t('error')}:</span> {error}
          </div>
        )}

        {!currentItinerary ? (
          <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
             <div className="text-center max-w-2xl mx-auto mb-4 px-4">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  {t('discoverTitle')} <span className="text-primary-600">Jharkhand</span>
                </h2>
                <p className="text-lg text-gray-600">
                  {t('discoverSubtitle')}
                </p>
             </div>
            <ItineraryForm 
              onSubmit={handleGenerate} 
              isLoading={isLoading} 
              language={language}
            />
          </div>
        ) : (
          <ItineraryDisplay 
            data={currentItinerary} 
            onNew={handleNew}
            onSave={handleSave}
            isSaved={isSaved}
            currentLanguage={language}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} YatraMitra. AI Generated content can be inaccurate.</p>
        </div>
      </footer>

      {/* Sidebar */}
      <HistorySidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        history={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
        currentLanguage={language}
      />
    </div>
  );
};

export default App;