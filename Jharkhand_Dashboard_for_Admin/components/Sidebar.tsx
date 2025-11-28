import React from 'react';
import { Home, Map, BarChart3, Settings, HelpCircle, LogOut } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('overview')}>
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-emerald-500/20">JT</div>
        <span className="font-semibold text-lg tracking-tight">Jharkhand Tourism</span>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        <NavItem 
          icon={Home} 
          label="Overview" 
          active={currentView === 'overview'} 
          onClick={() => onViewChange('overview')}
        />
        <NavItem 
          icon={Map} 
          label="Destinations" 
          active={currentView === 'destinations'} 
          onClick={() => onViewChange('destinations')}
        />
        {/* <NavItem 
          icon={BarChart3} 
          label="Analytics" 
          active={currentView === 'analytics'} 
          onClick={() => onViewChange('analytics')}
        /> */}
        <NavItem 
          icon={HelpCircle} 
          label="AI Assistant Logs" 
          active={currentView === 'ai-logs'} 
          onClick={() => onViewChange('ai-logs')}
        />
        <NavItem 
          icon={Settings} 
          label="Settings" 
          active={currentView === 'settings'} 
          onClick={() => onViewChange('settings')}
        />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => window.location.reload()} 
          className="flex items-center gap-3 text-slate-400 hover:text-white w-full px-4 py-2 transition-colors rounded-lg hover:bg-slate-800 group"
        >
          <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all duration-200 ${
    active 
      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
  }`}>
    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
    <span className="font-medium">{label}</span>
  </button>
);

export default Sidebar;