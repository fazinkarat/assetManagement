const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    purchaseDate: { type: Date },
    quantity: { type: Number, required: true },
    purchaseAmount: { type: Number },
    totalAmount: { type: Number }
});

module.exports = mongoose.model('Stock', stockSchema);
