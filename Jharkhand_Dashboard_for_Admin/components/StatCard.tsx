import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend, colorClass = "text-emerald-600" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        {change && (
          <p className={`text-xs font-medium mt-2 flex items-center ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-400'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '−'} {change}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-opacity-10 ${colorClass.replace('text-', 'bg-')}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  );
};

export default StatCard;