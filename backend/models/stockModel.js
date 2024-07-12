const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    purchaseDate: { type: Date },
    purchaseAmount: { type: Number },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number }
});

module.exports = mongoose.model('Stock', stockSchema);
