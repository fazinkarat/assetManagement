const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    model: String,
    purchaseDate: Date,
    expiryDate: Date,
    purchaseAmount: Number,
    quantity: Number,
    totalAmount: Number,
    licenseId: String
});

module.exports = mongoose.model('Item', itemSchema);
