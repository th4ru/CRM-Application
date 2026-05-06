const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: String, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);