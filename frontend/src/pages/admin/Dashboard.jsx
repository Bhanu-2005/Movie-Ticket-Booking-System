import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import StatCard from '../../components/dashboard/StatCard';
import { FiDollarSign, FiShoppingBag, FiFilm, FiMonitor, FiVideo, FiTrendingUp } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const mockChartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 8900 },
  { name: 'Jun', revenue: 14500 },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getOverviewStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load admin stats:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC2626]"></div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Overview</h1>
          <p className="text-gray-400 mt-2">Monitor your system performance and business metrics.</p>
        </div>
        
        <button 
          onClick={() => {
            if (!stats) return toast.error('No data to export');
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stats, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href",     dataStr);
            downloadAnchorNode.setAttribute("download", "dashboard_report.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            toast.success('Report downloaded successfully!');
          }}
          className="flex items-center px-4 py-2 bg-[#DC2626] hover:bg-red-700 text-white text-sm font-medium rounded shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all">
          <FiTrendingUp className="mr-2" /> Generate Report
        </button>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats?.revenue?.toLocaleString() || '0.00'}`} 
          icon={FiDollarSign} 
          colorClass="text-green-500" 
          trend={{ value: 12.5, isPositive: true }} 
        />
        <StatCard 
          title="Total Bookings" 
          value={stats?.bookings || 0} 
          icon={FiShoppingBag} 
          colorClass="text-blue-500" 
          trend={{ value: 8.2, isPositive: true }} 
        />
        <StatCard 
          title="Active Movies" 
          value={stats?.movies || 0} 
          icon={FiFilm} 
          colorClass="text-purple-500" 
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl flex items-center">
          <div className="p-4 bg-orange-500/10 border border-gray-700 rounded-lg mr-4">
            <FiMonitor className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Theatres</p>
            <h3 className="text-2xl font-bold text-white">{stats?.theatres || 0}</h3>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl flex items-center">
          <div className="p-4 bg-teal-500/10 border border-gray-700 rounded-lg mr-4">
            <FiMonitor className="w-8 h-8 text-teal-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Screens</p>
            <h3 className="text-2xl font-bold text-white">{stats?.screens || 0}</h3>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl flex items-center">
          <div className="p-4 bg-yellow-500/10 border border-gray-700 rounded-lg mr-4">
            <FiVideo className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Active Shows</p>
            <h3 className="text-2xl font-bold text-white">{stats?.shows || 0}</h3>
          </div>
        </div>
      </div>
      
      {/* Activity Chart Placeholder */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-6">Revenue Overview (Last 6 Months)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockChartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                itemStyle={{ color: '#DC2626' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#DC2626" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
