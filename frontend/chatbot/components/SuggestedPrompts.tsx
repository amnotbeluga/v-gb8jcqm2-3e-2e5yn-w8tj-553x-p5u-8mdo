import React from 'react';
import { PromptSuggestion } from '../types';
import { Compass, Camera, Tent, Coffee } from 'lucide-react';

interface SuggestedPromptsProps {
  prompts: PromptSuggestion[];
  onSelectPrompt: (text: string) => void;
}

const getIcon = (name: string) => {
  switch(name) {
    case 'compass': return <Compass className="w-4 h-4 text-emerald-600" />;
    case 'camera': return <Camera className="w-4 h-4 text-emerald-600" />;
    case 'coffee': return <Coffee className="w-4 h-4 text-emerald-600" />;
    case 'tent': return <Tent className="w-4 h-4 text-emerald-600" />;
    default: return <Compass className="w-4 h-4 text-emerald-600" />;
  }
};

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, onSelectPrompt }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 mb-8 animate-fade-in-up">
      {prompts.map((prompt) => (
        <button
          key={prompt.id}
          onClick={() => onSelectPrompt(prompt.prompt)}
          className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all text-left group"
        >
          <div className="bg-emerald-50 p-2 rounded-lg group-hover:bg-emerald-100 transition-colors">
            {getIcon(prompt.icon)}
          </div>
          <div className="flex-1">
            <div className="font-medium text-stone-800 text-sm">{prompt.label}</div>
            <div className="text-xs text-stone-400 truncate max-w-[200px]">{prompt.prompt}</div>
          </div>
        </button>
      ))}
    </div>
  );
};