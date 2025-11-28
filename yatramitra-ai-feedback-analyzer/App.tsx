import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useSearchParams } from 'react-router-dom';
import { LayoutDashboard, MessageSquareText, PlusCircle, Settings, Menu, X, AlertTriangle, Activity, AlertCircle } from 'lucide-react';
import { Feedback, DashboardMetrics, AnalysisResult } from './types';
import * as StorageService from './services/storageService';
import * as GeminiService from './services/geminiService';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// --- TYPES ---
interface AnalysisFailure {
  id: string;
  targetName: string;
  timestamp: Date;
  reason: string;
}

// --- COMPONENTS ---

// 1. Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/feedback', label: 'All Feedback', icon: <MessageSquareText size={20} /> },
    { path: '/submit', label: 'Submit Feedback', icon: <PlusCircle size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } md:relative md:translate-x-0`;

  return (
    <div className={sidebarClasses}>
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          YatraMitra
        </h1>
        <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-6 px-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => window.innerWidth < 768 && toggleSidebar()}
            className={`flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-500">Jharkhand Tourism</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Dashboard View
const Dashboard = ({ 
  feedback, 
  analyzingCount, 
  recentFailures 
}: { 
  feedback: Feedback[], 
  analyzingCount: number, 
  recentFailures: AnalysisFailure[] 
}) => {
  const metrics: DashboardMetrics = {
    totalFeedback: feedback.length,
    pendingAnalysis: feedback.filter(f => f.status === 'pending').length,
    sentimentBreakdown: {
      POSITIVE: feedback.filter(f => f.analysis?.sentimentLabel === 'POSITIVE').length,
      NEGATIVE: feedback.filter(f => f.analysis?.sentimentLabel === 'NEGATIVE').length,
      NEUTRAL: feedback.filter(f => f.analysis?.sentimentLabel === 'NEUTRAL').length,
      MIXED: feedback.filter(f => f.analysis?.sentimentLabel === 'MIXED').length,
    },
    totalAlerts: feedback.filter(f => f.analysis?.shouldRaiseAlert).length,
    urgentSafetyIssues: feedback.filter(f => f.analysis?.safetyFlags?.isUrgent).length,
  };

  const sentimentData = [
    { name: 'Positive', value: metrics.sentimentBreakdown.POSITIVE, color: '#22c55e' },
    { name: 'Neutral', value: metrics.sentimentBreakdown.NEUTRAL, color: '#94a3b8' },
    { name: 'Mixed', value: metrics.sentimentBreakdown.MIXED, color: '#eab308' },
    { name: 'Negative', value: metrics.sentimentBreakdown.NEGATIVE, color: '#ef4444' },
  ];

  const recentAlerts = feedback
    .filter(f => f.analysis?.shouldRaiseAlert)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
          <p className="text-slate-500">Real-time insights from tourist feedback</p>
        </div>
        <div className="flex gap-3">
           {metrics.urgentSafetyIssues > 0 && (
             <Link 
               to="/feedback?filter=alert" 
               className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg animate-pulse border border-red-200 hover:bg-red-200 transition-colors"
             >
               <AlertTriangle className="mr-2" size={18} />
               <span className="font-semibold">{metrics.urgentSafetyIssues} Urgent Safety Issues</span>
             </Link>
           )}
        </div>
      </div>

      {/* Real-time AI Status Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center text-lg font-semibold">
            <Activity className="mr-2 text-blue-400" size={20} />
            AI Analysis Status
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${analyzingCount > 0 ? 'bg-blue-500/20 text-blue-300 animate-pulse' : 'bg-slate-700 text-slate-400'}`}>
            {analyzingCount > 0 ? 'Processing' : 'Idle'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-400 text-sm mb-1">Active Jobs</p>
            <div className="text-3xl font-bold tracking-tight">{analyzingCount} <span className="text-sm font-normal text-slate-500">items in queue</span></div>
          </div>
          
          <div className="md:border-l md:border-slate-700 md:pl-6">
            <p className="text-slate-400 text-sm mb-2">Recent Failures</p>
            {recentFailures.length === 0 ? (
              <p className="text-slate-500 text-sm italic">No recent failures detected.</p>
            ) : (
              <ul className="space-y-2">
                {recentFailures.map((fail, i) => (
                  <li key={i} className="flex items-start text-xs text-red-300 bg-red-500/10 p-2 rounded">
                    <AlertCircle size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                    <span>Failed to analyze <strong>{fail.targetName}</strong> <span className='opacity-75'>({new Date(fail.timestamp).toLocaleTimeString()})</span></span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Feedback</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{metrics.totalFeedback}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Pending Analysis</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{metrics.pendingAnalysis}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Alerts</p>
          <p className="text-3xl font-bold text-orange-500 mt-2">{metrics.totalAlerts}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Safety Critical</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{metrics.urgentSafetyIssues}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution - Donut Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Sentiment Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Critical Alerts</h3>
          <div className="space-y-4">
            {recentAlerts.length === 0 ? (
              <p className="text-slate-400 italic">No active alerts.</p>
            ) : (
              recentAlerts.map(alert => (
                <div key={alert.id} className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-red-900">{alert.targetName}</h4>
                    <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded-full uppercase font-bold tracking-wide">
                      {alert.analysis?.safetyFlags?.isUrgent ? 'URGENT' : 'ALERT'}
                    </span>
                  </div>
                  <p className="text-sm text-red-800 mt-1 line-clamp-2">{alert.analysis?.alertReason}</p>
                  <p className="text-xs text-slate-500 mt-2">{new Date(alert.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Feedback List View with AI Actions
const FeedbackList = ({ 
  feedback, 
  onAnalyze,
  analyzingIds
}: { 
  feedback: Feedback[], 
  onAnalyze: (id: string) => void,
  analyzingIds: Set<string>
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = (searchParams.get('filter') as 'all' | 'pending' | 'alert') || 'all';

  const filteredData = feedback.filter(f => {
    if (filter === 'pending') return f.status === 'pending';
    if (filter === 'alert') return f.analysis?.shouldRaiseAlert;
    return true;
  });

  const getSentimentColor = (label?: string) => {
    switch (label) {
      case 'POSITIVE': return 'bg-green-100 text-green-700 border-green-200';
      case 'NEGATIVE': return 'bg-red-100 text-red-700 border-red-200';
      case 'NEUTRAL': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'MIXED': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Feedback Management</h2>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          {(['all', 'pending', 'alert'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setSearchParams({ filter: f })}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Target</th>
                <th className="px-6 py-4 font-semibold text-slate-700 w-1/3">Comment</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Sentiment</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{item.targetName}</div>
                    <div className="text-xs text-slate-500 capitalize">{item.targetType}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-2 text-slate-600">{item.comment}</p>
                    {item.analysis?.categories && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.analysis.categories.slice(0, 3).map((cat, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.analysis ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSentimentColor(item.analysis.sentimentLabel)}`}>
                        {item.analysis.sentimentLabel}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.analysis?.shouldRaiseAlert && (
                      <div className="flex items-center text-red-600 text-xs font-bold">
                        <AlertTriangle size={14} className="mr-1" />
                        ALERT
                      </div>
                    )}
                    {!item.analysis && <span className="text-slate-400 italic text-xs">Pending AI</span>}
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'pending' ? (
                      <button
                        onClick={() => onAnalyze(item.id)}
                        disabled={analyzingIds.has(item.id)}
                        className={`text-xs px-3 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition-colors ${
                          analyzingIds.has(item.id) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {analyzingIds.has(item.id) ? 'Analyzing...' : 'Analyze w/ Gemini'}
                      </button>
                    ) : (
                       <span className="text-xs text-green-600 font-medium">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No feedback found matching filters.
          </div>
        )}
      </div>
    </div>
  );
};

// 4. Submit Feedback Form (Simulator)
const SubmitFeedback = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    targetType: 'poi',
    targetName: '',
    comment: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      targetId: formData.targetName.toLowerCase().replace(/\s+/g, '_')
    });
    setFormData({ targetType: 'poi', targetName: '', comment: '', rating: 5 });
    alert("Feedback submitted! Go to 'All Feedback' to analyze it with AI.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulate Tourist Feedback</h2>
        <p className="text-slate-500 mb-8">Submit raw feedback data to test the AI analysis pipeline.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Type</label>
              <select
                value={formData.targetType}
                onChange={(e) => setFormData({...formData, targetType: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
              >
                <option value="poi">Point of Interest (POI)</option>
                <option value="vendor">Vendor/Service</option>
                <option value="itinerary">Itinerary</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ranchi Falls, City Cab"
                value={formData.targetName}
                onChange={(e) => setFormData({...formData, targetName: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map(star => (
                <label key={star} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={formData.rating === star}
                    onChange={() => setFormData({...formData, rating: star})}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{star} Stars</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Comment</label>
            <textarea
              required
              rows={4}
              placeholder="Describe the experience..."
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

// 5. Main App Layout & Logic
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for AI Status Tracking
  const [analyzingIds, setAnalyzingIds] = useState<Set<string>>(new Set());
  const [recentFailures, setRecentFailures] = useState<AnalysisFailure[]>([]);

  // Load initial data
  useEffect(() => {
    const data = StorageService.getFeedback();
    setFeedbackData(data);
    setLoading(false);
  }, []);

  const handleCreateFeedback = (data: any) => {
    const newFeedback = StorageService.addFeedback(data);
    setFeedbackData([newFeedback, ...feedbackData]);
  };

  const handleAnalyzeFeedback = async (id: string) => {
    const item = feedbackData.find(f => f.id === id);
    if (!item) return;

    // Start Analysis Tracking
    setAnalyzingIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    try {
      const result: AnalysisResult = await GeminiService.analyzeFeedbackWithGemini(item);
      const updated = StorageService.updateFeedbackAnalysis(id, result);
      
      if (updated) {
        setFeedbackData(prev => prev.map(f => f.id === id ? updated : f));
      }
    } catch (error) {
      console.error("Analysis Failed", error);
      // Track failure
      const failure: AnalysisFailure = {
        id,
        targetName: item.targetName,
        timestamp: new Date(),
        reason: "API or Network Error"
      };
      setRecentFailures(prev => [failure, ...prev].slice(0, 5)); // Keep last 5 failures
    } finally {
      // End Analysis Tracking
      setAnalyzingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-slate-500">Loading YatraMitra...</div>;

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Mobile */}
          <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
            <h1 className="font-bold text-slate-800">YatraMitra Admin</h1>
            <button onClick={() => setSidebarOpen(true)} className="text-slate-600">
              <Menu size={24} />
            </button>
          </header>

          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    feedback={feedbackData} 
                    analyzingCount={analyzingIds.size} 
                    recentFailures={recentFailures}
                  />
                } 
              />
              <Route 
                path="/feedback" 
                element={
                  <FeedbackList 
                    feedback={feedbackData} 
                    onAnalyze={handleAnalyzeFeedback}
                    analyzingIds={analyzingIds}
                  />
                } 
              />
              <Route path="/submit" element={<SubmitFeedback onSubmit={handleCreateFeedback} />} />
              <Route path="/settings" element={
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Settings</h2>
                  <button 
                    onClick={StorageService.clearData}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded border border-red-200 hover:bg-red-200"
                  >
                    Reset Demo Data
                  </button>
                  <p className="mt-4 text-sm text-slate-500">
                    API Key Configured: {process.env.API_KEY ? 'Yes (Hidden)' : 'No (Check metadata)'}
                  </p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;