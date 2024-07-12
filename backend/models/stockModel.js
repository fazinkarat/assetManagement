const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: String,
    model: String,
    location: String,
    purchaseDate: Date,
    expiryDate: Date,
    serialNumber: String,
    quantity: Number // Add this field if it doesn't exist
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
