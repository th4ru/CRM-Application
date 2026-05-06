import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ status: '', leadSource: '', assignedSalesperson: '' });
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [newLead, setNewLead] = useState({ leadName: '', companyName: '', email: '', phoneNumber: '', leadSource: 'Website', assignedSalesperson: '', status: 'New', dealValue: 0 });

  useEffect(() => {
    // Don't auto-fetch leads on page load
    // Only fetch when filters or search changes
    if (filters.status || filters.leadSource || filters.assignedSalesperson || search) {
      fetchLeads();
    }
  }, [filters, search]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leads');
      let filtered = res.data;
      if (filters.status) filtered = filtered.filter(l => l.status === filters.status);
      if (filters.leadSource) filtered = filtered.filter(l => l.leadSource === filters.leadSource);
      if (filters.assignedSalesperson) filtered = filtered.filter(l => l.assignedSalesperson === filters.assignedSalesperson);
      if (search) filtered = filtered.filter(l => l.leadName.toLowerCase().includes(search.toLowerCase()) || l.companyName.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()));
      setLeads(filtered);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setMessage({ type: 'error', text: 'Failed to fetch leads' });
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`);
      setMessage({ type: 'success', text: 'Lead deleted successfully' });
      fetchLeads();
    } catch (err) {
      console.error('Error deleting lead:', err);
      setMessage({ type: 'error', text: 'Failed to delete lead' });
    }
  };

  const createLead = async () => {
    if (!newLead.leadName || !newLead.companyName || !newLead.email || !newLead.phoneNumber || !newLead.assignedSalesperson) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/leads', newLead);
      console.log('Lead created:', response.data);
      setMessage({ type: 'success', text: 'Lead created successfully!' });
      setNewLead({ leadName: '', companyName: '', email: '', phoneNumber: '', leadSource: 'Website', assignedSalesperson: '', status: 'New', dealValue: 0 });
      setShowForm(false);
      setTimeout(() => {
        fetchLeads();
        setMessage({ type: '', text: '' });
      }, 1000);
    } catch (err) {
      console.error('Error creating lead:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create lead';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Leads</h1>
      {message.text && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <button onClick={() => setShowForm(!showForm)} className="mb-4 bg-green-500 text-white p-2 rounded hover:bg-green-600">Create Lead</button>
      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-4">
          <h2 className="text-xl mb-4">Add New Lead</h2>
          <form onSubmit={(e) => { e.preventDefault(); createLead(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lead Name</label>
              <input
                type="text"
                value={newLead.leadName}
                onChange={(e) => setNewLead({ ...newLead, leadName: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={newLead.companyName}
                onChange={(e) => setNewLead({ ...newLead, companyName: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                value={newLead.phoneNumber}
                onChange={(e) => setNewLead({ ...newLead, phoneNumber: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lead Source</label>
              <select
                value={newLead.leadSource}
                onChange={(e) => setNewLead({ ...newLead, leadSource: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="Website">Website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Cold Email">Cold Email</option>
                <option value="Event">Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned Salesperson</label>
              <input
                type="text"
                value={newLead.assignedSalesperson}
                onChange={(e) => setNewLead({ ...newLead, assignedSalesperson: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={newLead.status}
                onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estimated Deal Value</label>
              <input
                type="number"
                value={newLead.dealValue}
                onChange={(e) => setNewLead({ ...newLead, dealValue: parseFloat(e.target.value) || 0 })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                min="0"
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {loading ? 'Creating...' : 'Create Lead'}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border"
        />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="p-2 border ml-2">
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
        <select value={filters.leadSource} onChange={(e) => setFilters({ ...filters, leadSource: e.target.value })} className="p-2 border ml-2">
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Cold Email">Cold Email</option>
          <option value="Event">Event</option>
        </select>
        <input
          type="text"
          placeholder="Assigned Salesperson"
          value={filters.assignedSalesperson}
          onChange={(e) => setFilters({ ...filters, assignedSalesperson: e.target.value })}
          className="p-2 border ml-2"
        />
      </div>
      {leads.length > 0 ? (
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Company</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead._id}>
              <td className="p-2">{lead.leadName}</td>
              <td className="p-2">{lead.companyName}</td>
              <td className="p-2">{lead.email}</td>
              <td className="p-2">{lead.status}</td>
              <td className="p-2">
                <Link to={`/leads/${lead._id}`} className="text-blue-500 mr-2">View</Link>
                <button onClick={() => deleteLead(lead._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No leads found. Use the filters or search to display leads.</p>
        </div>
      )}
    </div>
  );
};

export default Leads;