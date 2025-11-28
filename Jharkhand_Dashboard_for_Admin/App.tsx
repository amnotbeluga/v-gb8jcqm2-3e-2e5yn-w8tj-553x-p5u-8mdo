import React, { useEffect, useState, useRef, useMemo } from 'react';
import { 
  Users, 
  MapPin, 
  Navigation, 
  MessageSquareMore, 
  Sparkles, 
  RefreshCw,
  TrendingUp,
  Search,
  AlertCircle,
  CheckCircle2,
  XCircle,
  UploadCloud,
  AlertTriangle
} from 'lucide-react';
import { 
  AreaChart, Area, PieChart, Pie, Cell, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar
} from 'recharts';
import Papa from 'papaparse';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import Toast from './components/Toast';
import { generateMockData, processData, generateMockAiLogs } from './data/mockData';
import { generateDashboardInsights } from './services/aiService';
import { DashboardMetrics, ViewType, AiLog, VisitRecord, Notification } from './types';

const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

const TITLES: Record<ViewType, string> = {
  overview: "Dashboard Overview",
  destinations: "Destinations Management",
  "ai-logs": "AI Assistant Logs",
  settings: "System Settings"
};

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [rawData, setRawData] = useState<VisitRecord[]>([]);
  const [aiLogs, setAiLogs] = useState<AiLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNotification = (type: Notification['type'], message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const loadMockData = () => {
    setLoading(true);
    setAiAnalysis(""); 
    setTimeout(() => {
      try {
        const generated = generateMockData(500); 
        setRawData(generated);
        const processed = processData(generated);
        const logs = generateMockAiLogs(20); 
        setData(processed);
        setAiLogs(logs);
        addNotification('success', 'Mock data loaded successfully');
      } catch (err) {
        console.error(err);
        addNotification('error', 'Failed to load mock data');
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  useEffect(() => {
    loadMockData();
  }, []);

  const handleAiAnalysis = async () => {
    if (!data) return;
    setAnalyzing(true);
    try {
      const insights = await generateDashboardInsights(data);
      
      // Safe markdown rendering
      const rawHtml = await marked(insights);
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      setAiAnalysis(sanitizedHtml);
      addNotification('success', 'AI insights generated');
    } catch (error) {
      addNotification('error', 'Failed to generate AI insights');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error("CSV Parsing Errors:", results.errors);
          addNotification('error', `CSV Error: ${results.errors[0].message}`);
          setLoading(false);
          return;
        }

        const parsedData = results.data as VisitRecord[];
        
        // Basic validation: check for required fields in the first row
        if (parsedData.length === 0 || !parsedData[0].visit_id || !parsedData[0].place_name) {
           addNotification('error', 'Invalid CSV format. Missing required columns.');
           setLoading(false);
           return;
        }

        try {
          setRawData(parsedData);
          const processed = processData(parsedData);
          setData(processed);
          setAiAnalysis("");
          addNotification('success', `Loaded ${parsedData.length} records from CSV`);
        } catch (err) {
          console.error("Data Processing Error:", err);
          addNotification('error', 'Failed to process CSV data structure');
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        addNotification('error', `File Read Error: ${error.message}`);
        setLoading(false);
      }
    });
    
    // Reset input so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (loading && !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Processing Tourism Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto relative">
        {/* Notifications Overlay */}
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          {notifications.map(n => (
            <Toast key={n.id} notification={n} onClose={removeNotification} />
          ))}
        </div>

        {/* Header */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {TITLES[currentView]}
            </h1>
            <p className="text-slate-500 mt-1">
              {currentView === 'overview' ? 'Real-time insights into visitor trends and engagement.' :
               currentView === 'destinations' ? 'Detailed metrics for all tourist spots.' :
               currentView === 'ai-logs' ? 'Monitor AI interactions and user queries.' : 'Manage dashboard preferences.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input 
              type="file" 
              ref={fileInputRef}
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium text-sm"
            >
              <UploadCloud className="w-4 h-4" /> Upload CSV
            </button>

            <button 
              onClick={loadMockData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Reset Data
            </button>

            {currentView === 'overview' && (
              <button 
                onClick={handleAiAnalysis}
                disabled={analyzing}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-colors shadow-md font-medium text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" /> 
                {analyzing ? 'Analyzing...' : 'Generate AI Insights'}
              </button>
            )}
          </div>
        </header>

        {/* Views */}
        {data && (
           <>
             {currentView === 'overview' && <OverviewView data={data} aiAnalysis={aiAnalysis} onDismissAi={() => setAiAnalysis("")} setView={setCurrentView} />}
             {currentView === 'destinations' && <DestinationsView destinations={data.topDestinations} />}
             {currentView === 'ai-logs' && <AiLogsView logs={aiLogs} />}
             {currentView === 'settings' && <SettingsView onImportClick={() => fileInputRef.current?.click()} recordCount={rawData.length} />}
           </>
        )}
      </main>
    </div>
  );
}

// --- Sub Components ---

const OverviewView = ({ data, aiAnalysis, onDismissAi, setView }: { data: DashboardMetrics, aiAnalysis: string, onDismissAi: () => void, setView: (v: ViewType) => void }) => {
  return (
    <div className="animate-fadeIn space-y-8">
      {/* AI Insights Panel */}
      {aiAnalysis && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <Sparkles className="w-32 h-32 text-indigo-600" />
          </div>
          <div className="flex justify-between items-start relative z-10 mb-4">
             <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> 
              Gemini Executive Summary
            </h3>
            <button onClick={onDismissAi} className="text-indigo-400 hover:text-indigo-600"><XCircle className="w-5 h-5"/></button>
          </div>
          
          <div 
            className="prose prose-sm text-indigo-900 max-w-none relative z-10 [&>ul]:list-disc [&>ul]:pl-5 [&>h3]:font-semibold"
            dangerouslySetInnerHTML={{ __html: aiAnalysis }} 
          />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Visitors" 
          value={data.totalVisitors.toLocaleString()} 
          change="Last 30 days"
          trend="neutral"
          icon={Users}
          colorClass="text-blue-600"
        />
        <StatCard 
          title="Directions Requested" 
          value={data.totalDirections.toLocaleString()} 
          change={`${data.totalVisitors > 0 ? ((data.totalDirections / data.totalVisitors) * 100).toFixed(1) : 0}% conversion`}
          trend="up"
          icon={Navigation}
          colorClass="text-emerald-600"
        />
        <StatCard 
          title="AI Assistant Queries" 
          value={data.totalAiQueries.toLocaleString()} 
          change={`${data.totalVisitors > 0 ? (data.totalAiQueries / data.totalVisitors).toFixed(1) : 0} per user avg`}
          trend="up"
          icon={MessageSquareMore}
          colorClass="text-purple-600"
        />
        <StatCard 
          title="Avg. Satisfaction" 
          value={data.avgRating} 
          change="out of 5.0"
          trend="neutral"
          icon={TrendingUp}
          colorClass="text-amber-600"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visits Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Visitor Traffic Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.visitsOverTime}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', {day: 'numeric', month: 'short'})}
                  stroke="#94a3b8"
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#059669" 
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Interest by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.categoryShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Destinations Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-slate-800">Top Destinations</h3>
             <button 
               onClick={() => setView('destinations')}
               className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
             >
               View All
             </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.topDestinations.slice(0, 5)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="name" type="category" width={100} stroke="#64748b" fontSize={12} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Legend />
                <Bar dataKey="visits" name="Page Views" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="directions" name="Directions Clicked" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

         {/* District Traffic Table/Chart */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">District-wise Interest</h3>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">District</th>
                  <th className="px-4 py-3 text-right">Visitor Count</th>
                  <th className="px-4 py-3 text-right">% Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.districtTraffic.slice(0, 6).map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{item.district}</td>
                    <td className="px-4 py-3 text-right">{item.visits}</td>
                    <td className="px-4 py-3 text-right">
                      {data.totalVisitors > 0 ? ((item.visits / data.totalVisitors) * 100).toFixed(1) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DestinationsView = ({ destinations }: { destinations: DashboardMetrics['topDestinations'] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(d => 
      d.name.toLowerCase().includes(debouncedTerm.toLowerCase()) || 
      d.district.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
  }, [destinations, debouncedTerm]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">All Destinations Performance</h2>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search places or districts..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          {filteredDestinations.length > 0 ? (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Destination Name</th>
                  <th className="px-6 py-4">District</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Total Visits</th>
                  <th className="px-6 py-4 text-right">Directions Clicked</th>
                  <th className="px-6 py-4 text-center">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDestinations.map((place, idx) => {
                   const conversion = place.visits > 0 ? (place.directions / place.visits) : 0;
                   return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{place.name}</td>
                      <td className="px-6 py-4">{place.district}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                          {place.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">{place.visits}</td>
                      <td className="px-6 py-4 text-right">{place.directions}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-medium ${
                          conversion > 0.5 ? 'text-emerald-600' : 'text-slate-600'
                        }`}>
                          {(conversion * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-slate-500">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No destinations found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AiLogsView = ({ logs }: { logs: AiLog[] }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">AI Assistant Logs</h2>
          <p className="text-slate-500 mt-1">Simulated logs. Upload real logs via CSV to analyze.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-sm">
          Export Report
        </button>
      </div>
      
      {logs.length > 0 ? (
        <div className="grid gap-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-start justify-between hover:shadow-md transition-shadow gap-4">
              <div className="flex gap-4">
                <div className={`mt-1 p-2 rounded-full flex-shrink-0 ${log.sentiment === 'Negative' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  <MessageSquareMore className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{log.query}</h4>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> {log.category}
                    </span>
                    <span className="py-0.5">{log.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                 <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                    log.sentiment === 'Positive' ? 'bg-green-50 text-green-700 border-green-100' :
                    log.sentiment === 'Negative' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {log.sentiment}
                  </span>
                {log.status === 'Resolved' ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3" /> Resolved
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                    <AlertCircle className="w-3 h-3" /> Unresolved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
          <MessageSquareMore className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">No AI logs available</p>
          <p className="text-sm">Upload a dataset containing AI interaction data.</p>
        </div>
      )}
    </div>
  );
};

const SettingsView = ({ onImportClick, recordCount }: { onImportClick: () => void, recordCount: number }) => {
  return (
    <div className="max-w-2xl animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 space-y-8">
         <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Data Management</h3>
           <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 gap-4">
              <div>
                <p className="font-medium text-slate-800">Dataset Source</p>
                <p className="text-sm text-slate-500">Currently loaded: {recordCount.toLocaleString()} records</p>
              </div>
               <button 
                onClick={onImportClick}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm"
              >
                Import New CSV
              </button>
           </div>
           <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800 flex gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p>Ensure your CSV file follows the required schema: <strong>visit_id, visit_date, place_name, district, category, etc.</strong> <br/> Missing columns may result in incomplete dashboards.</p>
           </div>
        </div>
        <hr className="border-slate-100" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">API Configuration</h3>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Gemini API Key</label>
            <div className="flex gap-2">
              <input type="password" value="************************" disabled className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed" />
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm disabled:opacity-50" disabled>Update</button>
            </div>
            <p className="text-xs text-slate-500">API Key is currently managed via environment variables for security.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;