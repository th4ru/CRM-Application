import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState({});
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [id]);

  const fetchLead = async () => {
    const res = await axios.get(`http://localhost:5000/api/leads/${id}`);
    setLead(res.data);
  };

  const fetchNotes = async () => {
    const res = await axios.get(`http://localhost:5000/api/leads/${id}/notes`);
    setNotes(res.data);
  };

  const updateLead = async (updates) => {
    await axios.put(`http://localhost:5000/api/leads/${id}`, updates);
    fetchLead();
  };

  const addNote = async () => {
    await axios.post(`http://localhost:5000/api/leads/${id}/notes`, { content: newNote, createdBy: 'Admin' });
    setNewNote('');
    fetchNotes();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Lead Details</h1>
      <div className="bg-white p-4 rounded shadow mb-6">
        <p>Name: {lead.leadName}</p>
        <p>Company: {lead.companyName}</p>
        <p>Email: {lead.email}</p>
        <p>Phone: {lead.phoneNumber}</p>
        <p>Source: {lead.leadSource}</p>
        <p>Salesperson: {lead.assignedSalesperson}</p>
        <p>Status: 
          <select value={lead.status} onChange={(e) => updateLead({ status: e.target.value })} className="p-1 border ml-2">
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </p>
        <p>Value: <input type="number" value={lead.dealValue} onChange={(e) => updateLead({ dealValue: e.target.value })} className="p-1 border ml-2" /></p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl mb-4">Notes</h2>
        <div className="mb-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-2 border"
            placeholder="Add a note"
          />
          <button onClick={addNote} className="mt-2 bg-blue-500 text-white p-2">Add Note</button>
        </div>
        {notes.map(note => (
          <div key={note._id} className="border-b p-2">
            <p>{note.content}</p>
            <p className="text-sm text-gray-500">By {note.createdBy} on {new Date(note.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadDetails;