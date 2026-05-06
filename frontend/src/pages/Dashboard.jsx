import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6 font-bold">Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalLeads || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">New Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.newLeads || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Qualified Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.qualifiedLeads || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Won Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.wonLeads || 0}</p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Lost Leads</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.lostLeads || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Deal Value</h3>
          <p className="text-3xl font-bold text-gray-900">${(stats.totalDealValue || 0).toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Won Deal Value</h3>
          <p className="text-3xl font-bold text-gray-900">${(stats.wonValue || 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Lead Status Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.statusCounts?.map((status) => (
            <div key={status._id} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{status.count}</div>
              <div className="text-sm text-gray-600">{status._id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;