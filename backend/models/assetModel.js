const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String },
    purchaseDate: { type: Date },
    expiryDate: { type: Date },
    totalAmount: { type: Number }
});

module.exports = mongoose.model('Asset', assetSchema);
