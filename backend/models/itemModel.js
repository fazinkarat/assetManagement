const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    model: String,
    location: String,
    purchaseDate: Date,
    expiryDate: Date,
    serialNumber: String,
    quantity: Number // Add this field if it doesn't exist
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
