const express = require('express');
const { getLeads, getLead, createLead, updateLead, deleteLead, getOverdueLeads, getTodayFollowUps } = require('../controllers/leadController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', getLeads);
router.get('/overdue', getOverdueLeads);
router.get('/followups/today', getTodayFollowUps);
router.post('/', createLead);
router.get('/:id', getLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;