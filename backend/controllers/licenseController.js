const License = require('../models/licenseModel');

exports.getAllLicenses = async (req, res) => {
    try {
        const licenses = await License.find();
        res.json(licenses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getLicenseById = async (req, res) => {
    try {
        const license = await License.findById(req.params.id);
        if (license) {
            res.json(license);
        } else {
            res.status(404).json({ error: 'License not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createLicense = async (req, res) => {
    try {
        const newLicense = new License(req.body);
        await newLicense.save();
        res.status(201).json(newLicense);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
};

exports.updateLicense = async (req, res) => {
    try {
        const updatedLicense = await License.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedLicense) {
            res.json(updatedLicense);
        } else {
            res.status(404).json({ error: 'License not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Bad Request' });
    }
};

exports.deleteLicense = async (req, res) => {
    try {
        const deletedLicense = await License.findByIdAndDelete(req.params.id);
        if (deletedLicense) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'License not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
