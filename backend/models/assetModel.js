const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    purchaseDate: { type: Date, default: null },
    expiryDate: { type: Date, default: null },
    purchaseAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Asset', assetSchema);
