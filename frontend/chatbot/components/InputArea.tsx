
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { LANGUAGE_OPTIONS } from '../constants';

interface InputAreaProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  language: Language;
}

// Type definition for the Web Speech API which might be prefixed
interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading, language }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
      
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow;
    const SpeechRecognitionConstructor = SpeechRecognition || webkitSpeechRecognition;

    if (SpeechRecognitionConstructor) {
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => {
          const separator = prev ? ' ' : '';
          return prev + separator + transcript;
        });
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Update recognition language when app language changes
  useEffect(() => {
    if (recognitionRef.current) {
      const langConfig = LANGUAGE_OPTIONS.find(opt => opt.value === language);
      if (langConfig && langConfig.speechCode) {
        recognitionRef.current.lang = langConfig.speechCode;
      }
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const placeholderText = language === 'English' 
    ? "Ask about Ranchi, waterfalls, or tribal culture..."
    : `Ask about Jharkhand in ${language}...`;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-stone-100 p-2 flex items-end gap-2 relative">
        
        {/* Mic Button */}
        <button
          onClick={toggleListening}
          disabled={isLoading}
          className={`
            p-3 rounded-full transition-all duration-200 flex-shrink-0
            ${isListening 
              ? 'bg-red-100 text-red-600 animate-pulse' 
              : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}
          `}
          title="Speak to type"
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening..." : placeholderText}
          className="flex-1 bg-transparent border-none focus:ring-0 text-stone-800 placeholder:text-stone-400 resize-none py-3 px-2 max-h-[120px] scrollbar-hide text-base"
          rows={1}
          disabled={isLoading}
        />

        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className={`
            p-3 rounded-full transition-all duration-200 flex-shrink-0
            ${input.trim() && !isLoading 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transform hover:scale-105' 
              : 'bg-stone-100 text-stone-300 cursor-not-allowed'}
          `}
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </div>
      {isListening && (
        <div className="text-xs text-center text-stone-400 mt-2">
          Listening... Speak now
        </div>
      )}
    </div>
  );
};