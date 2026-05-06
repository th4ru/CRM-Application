const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ lead: req.params.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createNote = async (req, res) => {
  const { content, createdBy } = req.body;
  try {
    const note = new Note({ content, createdBy, lead: req.params.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};