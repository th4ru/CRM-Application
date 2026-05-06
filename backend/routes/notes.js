const express = require('express');
const { getNotes, createNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/leads/:id/notes', getNotes);
router.post('/leads/:id/notes', createNote);

module.exports = router;