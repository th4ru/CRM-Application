const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
  try {
    console.log('GET /api/leads - Fetching all leads');
    const leads = await Lead.find().sort({ createdAt: -1 });
    console.log(`Found ${leads.length} leads`);
    res.json(leads);
  } catch (err) {
    console.error('Error fetching leads:', err.message);
    res.status(500).json({ message: 'Error fetching leads', error: err.message });
  }
};

exports.getLead = async (req, res) => {
  try {
    console.log('GET /api/leads/:id - Fetching lead:', req.params.id);
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (err) {
    console.error('Error fetching lead:', err.message);
    res.status(500).json({ message: 'Error fetching lead', error: err.message });
  }
};

exports.createLead = async (req, res) => {
  const { leadName, companyName, email, phoneNumber, leadSource, assignedSalesperson, status, dealValue } = req.body;
  console.log('POST /api/leads - Creating lead:', JSON.stringify(req.body));
  
  try {
    // Validation
    if (!leadName || !companyName || !email || !phoneNumber || !leadSource || !assignedSalesperson) {
      console.warn('Missing required fields');
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    const lead = new Lead({ 
      leadName, 
      companyName, 
      email, 
      phoneNumber, 
      leadSource, 
      assignedSalesperson, 
      status: status || 'New', 
      dealValue: dealValue || 0 
    });
    
    const savedLead = await lead.save();
    console.log('Lead created successfully:', savedLead._id);
    res.status(201).json(savedLead);
  } catch (err) {
    console.error('Error creating lead:', err.message);
    res.status(500).json({ message: 'Error creating lead', error: err.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    console.log('PUT /api/leads/:id - Updating lead:', req.params.id, JSON.stringify(req.body));
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    console.log('Lead updated successfully:', lead._id);
    res.json(lead);
  } catch (err) {
    console.error('Error updating lead:', err.message);
    res.status(500).json({ message: 'Error updating lead', error: err.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    console.log('DELETE /api/leads/:id - Deleting lead:', req.params.id);
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    console.log('Lead deleted successfully:', lead._id);
    res.json({ message: 'Lead deleted successfully', id: lead._id });
  } catch (err) {
    console.error('Error deleting lead:', err.message);
    res.status(500).json({ message: 'Error deleting lead', error: err.message });
  }
};