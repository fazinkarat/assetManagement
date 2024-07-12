const License = require('../models/licenseModel');

exports.getAllLicenses = async (req, res) => {
    try {
        const licenses = await License.find({});
        res.json(licenses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getLicenseById = async (req, res) => {
    try {
        const license = await License.findById(req.params.id);
        res.json(license);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createLicense = async (req, res) => {
    try {
        const newLicense = new License(req.body);
        const savedLicense = await newLicense.save();
        res.status(201).json(savedLicense);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateLicense = async (req, res) => {
    try {
        const updatedLicense = await License.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLicense);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteLicense = async (req, res) => {
    try {
        await License.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
