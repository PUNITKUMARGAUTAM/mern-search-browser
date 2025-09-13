const History = require('../models/History');

exports.suggest = async (req, res) => {
  const q = req.query.q || '';
  try {
    const regex = new RegExp('^' + q, 'i');

    const suggestions = await History.aggregate([
      { $match: { query: { $regex: regex } } },
      { $group: { _id: '$query', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json(suggestions.map(s => s._id));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Suggestion failed' });
  }
};
