import React from 'react';
import { MessageSquarePlus, Trash2, MessageSquare, X } from 'lucide-react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onCreateSession: () => void;
  onDeleteSession: (e: React.MouseEvent, sessionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession,
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-stone-900 text-stone-300 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:w-64 md:flex-shrink-0 h-full border-r border-stone-800
      `}>
        {/* Header */}
        <div className="p-4 border-b border-stone-800 flex justify-between items-center">
          <h2 className="font-bold text-white tracking-wide">Travel History</h2>
          <button onClick={onClose} className="md:hidden text-stone-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={() => {
              onCreateSession();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl transition-colors shadow-lg shadow-emerald-900/20"
          >
            <MessageSquarePlus size={20} />
            <span className="font-medium">New Trip</span>
          </button>
        </div>

        {/* Session List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-hide">
          {sessions.length === 0 ? (
            <div className="text-center py-8 px-4 text-stone-500 text-sm">
              No previous trips found. Start a new conversation!
            </div>
          ) : (
            sessions.slice().reverse().map((session) => (
              <button
                key={session.id}
                onClick={() => {
                  onSelectSession(session.id);
                  if (window.innerWidth < 768) onClose();
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors group
                  ${session.id === currentSessionId 
                    ? 'bg-stone-800 text-white border border-stone-700' 
                    : 'hover:bg-stone-800/50 text-stone-400 hover:text-stone-200'}
                `}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare size={16} className="flex-shrink-0" />
                  <span className="truncate text-sm font-medium">
                    {session.title || "New Conversation"}
                  </span>
                </div>
                <div
                  onClick={(e) => onDeleteSession(e, session.id)}
                  className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-900/30 hover:text-red-400 transition-all"
                  title="Delete Chat"
                >
                  <Trash2 size={14} />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 text-xs text-stone-500 text-center">
          Jharkhand Tourist Assistant
        </div>
      </aside>
    </>
  );
};