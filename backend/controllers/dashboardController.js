const Lead = require('../models/Lead');

exports.getStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const statusCounts = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const totalDealValue = await Lead.aggregate([
      { $group: { _id: null, total: { $sum: '$dealValue' } } }
    ]);
    const wonValue = await Lead.aggregate([
      { $match: { status: 'Won' } },
      { $group: { _id: null, total: { $sum: '$dealValue' } } }
    ]);
    res.json({
      totalLeads,
      statusCounts,
      totalDealValue: totalDealValue[0]?.total || 0,
      wonValue: wonValue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};