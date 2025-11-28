import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Demo data for charts
  const visitData = [
    { month: 'Jan', visits: 1200 },
    { month: 'Feb', visits: 1900 },
    { month: 'Mar', visits: 2400 },
    { month: 'Apr', visits: 1800 },
    { month: 'May', visits: 2800 },
    { month: 'Jun', visits: 3500 },
  ];

  const destinationData = [
    { name: 'Netarhat', value: 35 },
    { name: 'Patratu', value: 25 },
    { name: 'Hundru Falls', value: 20 },
    { name: 'Betla', value: 15 },
    { name: 'Deoghar', value: 5 },
  ];

  const salesData = [
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 49000 },
    { month: 'Apr', sales: 63000 },
    { month: 'May', sales: 58000 },
    { month: 'Jun', sales: 72000 },
  ];

  const COLORS = ['#228B22', '#32CD32', '#3CB371', '#66CDAA', '#8FBC8F'];

  // Custom label for pie chart
  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />
      <div className="flex bg-neutral">
        
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-6 hidden md:block">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <p className="text-gray-400 text-sm">Smart Tourism Jharkhand</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'dashboard'
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('tourists')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'tourists'
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Tourists
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                activeTab === 'marketplace'
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Marketplace
            </button>
          </nav>

          <div className="absolute bottom-6 left-6">
            <button className="text-gray-400 hover:text-white flex items-center">
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Button */}
        <div className="md:hidden fixed bottom-4 right-4 z-10">
          <button className="bg-primary text-white p-3 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'tourists' && 'Tourist Management'}
                {activeTab === 'marketplace' && 'Marketplace Management'}
              </h1>
            </div>

            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Visits Trend */}
                <motion.div
                  className="col-span-3 bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-lg font-semibold mb-4">Tourist Visits Trend</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visits" stroke="#228B22" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Top Destinations */}
                <motion.div
                  className="col-span-3 md:col-span-1 bg-white p-6 rounded-xl shadow-md"
                >
                  <h2 className="text-lg font-semibold mb-4">Top Destinations</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={destinationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {destinationData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Marketplace Sales */}
                <motion.div
                  className="col-span-3 md:col-span-2 bg-white p-6 rounded-xl shadow-md"
                >
                  <h2 className="text-lg font-semibold mb-4">Marketplace Sales</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value}`, 'Sales']} />
                        <Legend />
                        <Bar dataKey="sales" fill="#FF7043" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

              </div>
            )}

            {/* Tourists */}
            {activeTab === 'tourists' && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Tourist Management</h2>
                <p className="text-gray-500">This section would contain tourist data management features.</p>
              </div>
            )}

            {/* Marketplace */}
            {activeTab === 'marketplace' && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Marketplace Management</h2>
                <p className="text-gray-500">This section would contain marketplace product management features.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
