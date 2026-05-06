import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get('http://localhost:5000/api/dashboard/stats');
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Leads: {stats.totalLeads}</div>
        <div className="bg-white p-4 rounded shadow">Total Deal Value: ${stats.totalDealValue}</div>
        <div className="bg-white p-4 rounded shadow">Won Value: ${stats.wonValue}</div>
        <div className="bg-white p-4 rounded shadow">Status Counts: {JSON.stringify(stats.statusCounts)}</div>
      </div>
    </div>
  );
};

export default Dashboard;