const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    purchaseDate: { type: Date },
    expiryDate: { type: Date }
});

module.exports = mongoose.model('License', licenseSchema);
