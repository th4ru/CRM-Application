const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createLead = async (req, res) => {
  const { leadName, companyName, email, phoneNumber, leadSource, assignedSalesperson, status, dealValue } = req.body;
  try {
    const lead = new Lead({ leadName, companyName, email, phoneNumber, leadSource, assignedSalesperson, status, dealValue });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};