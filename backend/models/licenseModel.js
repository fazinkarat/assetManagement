const mongoose = require('mongoose');

// Define license schema
const licenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  expiryDate: { type: Date },
  // Add more fields as per your requirement
});

module.exports = mongoose.model('License', licenseSchema);
