import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState({});
  const [editedLead, setEditedLead] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [noteLoading, setNoteLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/leads/${id}`);
      setLead(res.data);
      setEditedLead(res.data);
    } catch (err) {
      console.error('Error fetching lead:', err);
      setMessage({ type: 'error', text: 'Failed to load lead details' });
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/leads/${id}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setMessage({ type: 'error', text: 'Failed to load notes' });
    }
  };

  const saveLead = async () => {
    if (!editedLead.leadName || !editedLead.companyName || !editedLead.email || !editedLead.phoneNumber || !editedLead.leadSource || !editedLead.assignedSalesperson) {
      setMessage({ type: 'error', text: 'Please fill in all required lead details before saving.' });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/leads/${id}`, editedLead);
      setMessage({ type: 'success', text: 'Lead details saved successfully.' });
      setEditMode(false);
      fetchLead();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      console.error('Error saving lead:', err);
      setMessage({ type: 'error', text: 'Failed to save lead details.' });
    }
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditedLead(lead);
    setMessage({ type: '', text: '' });
  };

  const addNote = async () => {
    if (!newNote.trim()) {
      setMessage({ type: 'error', text: 'Note content cannot be empty' });
      return;
    }

    setNoteLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/leads/${id}/notes`, { 
        content: newNote.trim(), 
        createdBy: 'Admin' 
      });
      setMessage({ type: 'success', text: 'Note added successfully' });
      setNewNote('');
      fetchNotes();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      console.error('Error adding note:', err);
      setMessage({ type: 'error', text: 'Failed to add note' });
    } finally {
      setNoteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading lead details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6 font-bold">Lead Details</h1>

      {message.text && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">Lead Information</h2>
          {editMode ? (
            <div className="flex gap-2">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveLead}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Edit Lead
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Lead Name</label>
            {editMode ? (
              <input
                type="text"
                value={editedLead.leadName || ''}
                onChange={(e) => setEditedLead({ ...editedLead, leadName: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="mt-1 text-lg">{lead.leadName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            {editMode ? (
              <input
                type="text"
                value={editedLead.companyName || ''}
                onChange={(e) => setEditedLead({ ...editedLead, companyName: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="mt-1 text-lg">{lead.companyName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {editMode ? (
              <input
                type="email"
                value={editedLead.email || ''}
                onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="mt-1 text-lg">{lead.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            {editMode ? (
              <input
                type="text"
                value={editedLead.phoneNumber || ''}
                onChange={(e) => setEditedLead({ ...editedLead, phoneNumber: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="mt-1 text-lg">{lead.phoneNumber}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lead Source</label>
            {editMode ? (
              <select
                value={editedLead.leadSource || ''}
                onChange={(e) => setEditedLead({ ...editedLead, leadSource: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="Website">Website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Cold Email">Cold Email</option>
                <option value="Event">Event</option>
              </select>
            ) : (
              <p className="mt-1 text-lg">{lead.leadSource}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned Salesperson</label>
            {editMode ? (
              <input
                type="text"
                value={editedLead.assignedSalesperson || ''}
                onChange={(e) => setEditedLead({ ...editedLead, assignedSalesperson: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="mt-1 text-lg">{lead.assignedSalesperson}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            {editMode ? (
              <select
                value={editedLead.status || 'New'}
                onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            ) : (
              <p className="mt-1 text-lg">{lead.status}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deal Value</label>
            {editMode ? (
              <input
                type="number"
                value={editedLead.dealValue ?? 0}
                onChange={(e) => setEditedLead({ ...editedLead, dealValue: parseFloat(e.target.value) || 0 })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                min="0"
              />
            ) : (
              <p className="mt-1 text-lg">{lead.dealValue}</p>
            )}
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Created: {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '-'}</p>
          <p>Last Updated: {lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : '-'}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Notes ({notes.length})</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Add New Note</label>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your note here..."
            rows="4"
          />
          <button 
            onClick={addNote} 
            disabled={noteLoading || !newNote.trim()}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {noteLoading ? 'Adding Note...' : 'Add Note'}
          </button>
        </div>

        <div className="space-y-4">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No notes yet. Add the first note above.</p>
          ) : (
            notes.map(note => (
              <div key={note._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <p className="text-gray-800 mb-2">{note.content}</p>
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>By: {note.createdBy}</span>
                  <span>{new Date(note.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;