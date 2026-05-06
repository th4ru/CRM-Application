const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  leadSource: { type: String, enum: ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event'], required: true },
  assignedSalesperson: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'], default: 'New' },
  dealValue: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);