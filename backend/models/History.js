const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'BrowserUser' },
  query: String,
  results: [{}]
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
