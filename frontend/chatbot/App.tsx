
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { SuggestedPrompts } from './components/SuggestedPrompts';
import { Sidebar } from './components/Sidebar';
import { ItineraryModal } from './components/ItineraryModal';
import { MapModal } from './components/MapModal';
import { createChatSession, sendMessage } from './services/geminiService';
import { ChatMessage, Role, Language, ChatSession } from './types';
import { TRANSLATIONS } from './constants';
import { Chat } from '@google/genai';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const App: React.FC = () => {
  // State
  const [language, setLanguage] = useState<Language>('English');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  // Refs
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Current Session Helpers
  const currentSession = sessions.find(s => s.id === currentSessionId);
  const currentMessages = currentSession?.messages || [];

  // Load from local storage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('jh_tourist_sessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed);
        if (parsed.length > 0) {
          setCurrentSessionId(parsed[parsed.length - 1].id);
        } else {
          createNewSession('English');
        }
      } catch (e) {
        createNewSession('English');
      }
    } else {
      createNewSession('English');
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('jh_tourist_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  // Initialize/Restore Chat Session Object when switching sessions
  useEffect(() => {
    const initChat = async () => {
      if (!currentSession) return;
      // Filter out error messages or UI-only states if necessary
      const history = currentSession.messages.filter(m => !m.isError);
      try {
        const session = await createChatSession(history);
        chatSessionRef.current = session;
      } catch (error) {
        console.error("Failed to restore chat session", error);
      }
    };
    initChat();
  }, [currentSessionId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length, isLoading]);

  const createNewSession = (lang: Language) => {
    const newId = generateId();
    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      role: Role.ASSISTANT,
      content: TRANSLATIONS[lang].greeting,
      timestamp: Date.now(),
    };
    
    const newSession: ChatSession = {
      id: newId,
      title: 'New Trip',
      messages: [welcomeMsg],
      language: lang,
      updatedAt: Date.now()
    };

    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newId);
    setLanguage(lang);
    
    createChatSession([welcomeMsg]).then(chat => chatSessionRef.current = chat);
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(newSessions);
    localStorage.setItem('jh_tourist_sessions', JSON.stringify(newSessions));

    if (currentSessionId === sessionId) {
      if (newSessions.length > 0) {
        setCurrentSessionId(newSessions[newSessions.length - 1].id);
      } else {
        createNewSession(language);
      }
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (currentSession && currentSession.messages.length === 1 && currentSession.messages[0].id === 'welcome') {
       const updatedSessions = sessions.map(s => {
         if (s.id === currentSessionId) {
           return {
             ...s,
             language: newLang,
             messages: [{
               ...s.messages[0],
               content: TRANSLATIONS[newLang].greeting
             }]
           };
         }
         return s;
       });
       setSessions(updatedSessions);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !currentSessionId) return;
    
    if (!chatSessionRef.current) {
       chatSessionRef.current = await createChatSession(currentMessages);
    }

    const userMsg: ChatMessage = {
      id: generateId(),
      role: Role.USER,
      content: text,
      timestamp: Date.now(),
    };

    // Optimistic update
    updateSessionMessages(currentSessionId, [...currentMessages, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendMessage(chatSessionRef.current, text, language);
      
      const botMsg: ChatMessage = {
        id: generateId(),
        role: Role.ASSISTANT,
        content: responseText,
        timestamp: Date.now(),
      };
      
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          // Reconstruct message history from currentMessages (captured before optimistic update)
          // to ensure we don't duplicate the user message.
          const updatedMessages = [...currentMessages, userMsg, botMsg];
          
          // Update title if it's the first interaction (Welcome + New User Msg)
          let title = session.title;
          if (currentMessages.length === 1) {
            if (text) title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
          }
          return { ...session, messages: updatedMessages, title, updatedAt: Date.now() };
        }
        return session;
      }));

    } catch (error) {
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: Role.ASSISTANT,
        content: "Sorry, I encountered an error connecting to the service. Please try again later.",
        timestamp: Date.now(),
        isError: true
      };
      updateSessionMessages(currentSessionId, [...currentMessages, userMsg, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMessage = async (msgId: string, newText: string) => {
    if (!currentSessionId || !currentSession) return;
    const msgIndex = currentSession.messages.findIndex(m => m.id === msgId);
    if (msgIndex === -1) return;

    const historyToKeep = currentSession.messages.slice(0, msgIndex);
    chatSessionRef.current = await createChatSession(historyToKeep);

    const editedMsg: ChatMessage = {
      ...currentSession.messages[msgIndex],
      content: newText,
      timestamp: Date.now()
    };

    updateSessionMessages(currentSessionId, [...historyToKeep, editedMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendMessage(chatSessionRef.current, newText, language);
      
      const botMsg: ChatMessage = {
        id: generateId(),
        role: Role.ASSISTANT,
        content: responseText,
        timestamp: Date.now(),
      };

      updateSessionMessages(currentSessionId, [...historyToKeep, editedMsg, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: Role.ASSISTANT,
        content: "Sorry, I couldn't regenerate the response.",
        timestamp: Date.now(),
        isError: true
      };
      updateSessionMessages(currentSessionId, [...historyToKeep, editedMsg, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSessionMessages = (sessionId: string, newMessages: ChatMessage[]) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, messages: newMessages, updatedAt: Date.now() } : s
    ));
  };

  const handleItinerarySelect = (itineraryTitle: string) => {
    handleSendMessage(`Tell me more about the "${itineraryTitle}" itinerary. Provide a detailed day-by-day plan.`);
  };

  return (
    <div className="flex h-screen w-full bg-stone-50 overflow-hidden">
      <Sidebar 
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={setCurrentSessionId}
        onCreateSession={() => createNewSession(language)}
        onDeleteSession={handleDeleteSession}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative shadow-2xl border-x border-stone-200 bg-white mt-0 mb-1 rounded-lg overflow-hidden">
        <Header 
          currentLanguage={language} 
          onLanguageChange={handleLanguageChange} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMap={() => setIsMapOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 pb-32 bg-stone-50">
          <MessageList 
            messages={currentMessages} 
            isLoading={isLoading} 
            onEdit={handleEditMessage}
          />
          
          {currentMessages.length === 1 && (
            <SuggestedPrompts 
              prompts={TRANSLATIONS[language].prompts}
              onSelectPrompt={handleSendMessage} 
            />
          )}
          <div ref={messagesEndRef} />
        </main>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent pt-10 pb-4 px-4">
          <InputArea 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
            language={language} 
          />
        </div>

        <ItineraryModal 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectItinerary={handleItinerarySelect}
        />

        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          onSelectLocation={handleItinerarySelect}
        />
      </div>
    </div>
  );
};

export default App;