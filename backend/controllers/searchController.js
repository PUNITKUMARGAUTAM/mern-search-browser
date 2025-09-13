const SearchItem = require('../models/SearchItem');
const History = require('../models/History');

// Add new search item
exports.addItem = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const item = new SearchItem({ title, description, link });
    await item.save();

    res.status(201).json({ message: 'Item saved successfully', item });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save item' });
  }
};

// Search local DB
exports.search = async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ message: 'Query required' });

  try {
    const regex = new RegExp(q, 'i');
    const items = await SearchItem.find({
      $or: [
        { title: regex },
        { description: regex }
      ]
    }).limit(20);

    if (req.user?.id) {
      await History.create({ user: req.user.id, query: q, results: items });
    }

    res.json({ query: q, results: items });
  } catch (err) {
    console.error('Search error', err.message);
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};

// Get history
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};

// Suggestions
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





// const axios = require('axios');
// const History = require('../models/History');

// exports.search = async (req, res) => {
//   const q = req.query.q;
//   if (!q) return res.status(400).json({ message: 'Query required' });

//   try {
//     const key = process.env.GOOGLE_API_KEY;
//     const cx = process.env.GOOGLE_CX;
//     const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${encodeURIComponent(q)}`;

//     const gres = await axios.get(url);
//     const items = (gres.data.items || []).map(i => ({
//       title: i.title,
//       snippet: i.snippet,
//       link: i.link
//     }));

//     if (req.user?.id) {
//       await History.create({ user: req.user.id, query: q, results: items.slice(0, 10) });
//     }

//     res.json({ query: q, results: items });
//   } catch (err) {
//     console.error('Search error', err.message);
//     res.status(500).json({ message: 'Search failed', error: err.message });
//   }
// };

// exports.getHistory = async (req, res) => {
//   try {
//     const history = await History.find({ user: req.user.id })
//       .sort({ createdAt: -1 })
//       .limit(50);
//     res.json(history);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: 'Failed to fetch history' });
//   }
// };
