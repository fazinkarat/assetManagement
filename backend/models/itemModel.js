const mongoose = require('mongoose');

// Define item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Add more fields as per your requirement
});

module.exports = mongoose.model('Item', itemSchema);
