const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
    name: String,
    model: String,
    location: String,
    purchaseDate: Date,
    expiryDate: Date,
    serialNumber: String,
    quantity: Number // Add this field if it doesn't exist
});

const License = mongoose.model('License', licenseSchema);
module.exports = License;
