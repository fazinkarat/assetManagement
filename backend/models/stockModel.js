const mongoose = require('mongoose');

// Define stock schema
const stockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  // Add more fields as per your requirement
});

module.exports = mongoose.model('Stock', stockSchema);
