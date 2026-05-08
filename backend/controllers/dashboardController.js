const Lead = require('../models/Lead');

exports.getStats = async (req, res) => {
  try {
    console.log('GET /api/dashboard/stats - Fetching dashboard stats');

    
    const totalLeads = await Lead.countDocuments();
    console.log('Total leads:', totalLeads);

    
    const statusCounts = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    console.log('Status counts:', statusCounts);

    // Individual status counts
    const newLeads = statusCounts.find(s => s._id === 'New')?.count || 0;
    const qualifiedLeads = statusCounts.find(s => s._id === 'Qualified')?.count || 0;
    const wonLeads = statusCounts.find(s => s._id === 'Won')?.count || 0;
    const lostLeads = statusCounts.find(s => s._id === 'Lost')?.count || 0;

    
    const totalDealValueResult = await Lead.aggregate([
      { $group: { _id: null, total: { $sum: '$dealValue' } } }
    ]);
    const totalDealValue = totalDealValueResult[0]?.total || 0;

    
    const wonValueResult = await Lead.aggregate([
      { $match: { status: 'Won' } },
      { $group: { _id: null, total: { $sum: '$dealValue' } } }
    ]);
    const wonValue = wonValueResult[0]?.total || 0;

    console.log('Dashboard stats calculated:', {
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalDealValue,
      wonValue
    });

    res.json({
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalDealValue,
      wonValue,
      statusCounts
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err.message);
    res.status(500).json({ message: 'Error fetching dashboard stats', error: err.message });
  }
};