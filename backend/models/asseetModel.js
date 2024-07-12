const mongoose = require('mongoose');

// Define asset schema
const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String },
  location: { type: String },
  purchaseDate: { type: Date },
  licenseExpiryDate: { type: Date },
  serialNumber: { type: String, required: true },
  // Add more fields as per your requirement
});

module.exports = mongoose.model('Asset', assetSchema);
