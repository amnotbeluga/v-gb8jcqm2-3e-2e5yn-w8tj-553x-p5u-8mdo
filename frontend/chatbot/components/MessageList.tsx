import React from 'react';
import { ChatMessage } from '../types';
import { MessageBubble } from './MessageBubble';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onEdit?: (id: string, newText: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, onEdit }) => {
  return (
    <div className="flex flex-col w-full">
      {messages.map((msg) => (
        <MessageBubble 
          key={msg.id} 
          message={msg} 
          onEdit={onEdit}
        />
      ))}
      
      {isLoading && (
        <div className="flex justify-start w-full mb-6">
           <div className="flex max-w-[75%] gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm mt-1">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="bg-white text-stone-500 px-4 py-3 rounded-2xl rounded-tl-none border border-stone-100 shadow-sm flex items-center gap-2">
              <span className="text-xs font-medium animate-pulse">Thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};