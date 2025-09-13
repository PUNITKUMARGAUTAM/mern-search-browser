const mongoose = require('mongoose');

const searchItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String
}, { timestamps: true });

module.exports = mongoose.model('SearchItem', searchItemSchema);
