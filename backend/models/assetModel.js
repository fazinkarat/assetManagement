const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: String,
    model: String,
    location: String,
    purchaseDate: Date,
    expiryDate: Date,
    serialNumber: String,
    quantity: Number // Add this field if it doesn't exist
});

const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset;
