
import React, { useState } from 'react';
import { ChatMessage, Role } from '../types';
import { Bot, User, AlertCircle, Pencil, Check, X } from 'lucide-react';
import { parseMarkdown } from '../utils/markdown';

interface MessageBubbleProps {
  message: ChatMessage;
  onEdit?: (id: string, newText: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onEdit }) => {
  const isUser = message.role === Role.USER;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.content);

  const handleSaveEdit = () => {
    if (editText.trim() !== message.content && onEdit) {
      onEdit(message.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(message.content);
    setIsEditing(false);
  };

  return (
    <div className={`flex w-full mb-6 group ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm mt-1
          ${isUser ? 'bg-stone-700 text-white' : 'bg-emerald-100 text-emerald-700'}
        `}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        {/* Bubble */}
        <div className={`
          relative px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base w-full overflow-hidden
          ${isUser 
            ? 'bg-stone-800 text-white rounded-tr-none' 
            : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
          }
          ${message.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}
        `}>
          {message.isError && (
            <div className="flex items-center gap-2 mb-1 font-bold text-red-600">
              <AlertCircle size={16} />
              <span>Error</span>
            </div>
          )}

          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea 
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-stone-700 text-white p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={handleCancelEdit}
                  className="p-1 hover:bg-stone-600 rounded text-stone-300"
                >
                  <X size={16} />
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="p-1 hover:bg-stone-600 rounded text-emerald-400"
                >
                  <Check size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="break-words">
               {isUser ? message.content : parseMarkdown(message.content)}
            </div>
          )}
          
          {/* Footer Info (Time & Edit Button) */}
          <div className={`flex items-center gap-2 mt-1 ${isUser ? 'justify-end' : 'justify-between'}`}>
             {!isUser && <span />} {/* Spacer */}
             <div className="flex items-center gap-2">
                {isUser && !isEditing && onEdit && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400 hover:text-white"
                    title="Edit message"
                  >
                    <Pencil size={12} />
                  </button>
                )}
                <span className={`text-[10px] ${isUser ? 'text-stone-400' : 'text-stone-400'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
