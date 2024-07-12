const License = require('../models/licenseModel');

// Controller logic for licenses
exports.getAllLicenses = async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLicense = async (req, res) => {
  const license = new License(req.body);
  try {
    const newLicense = await license.save();
    res.status(201).json(newLicense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getLicenseById = async (req, res) => {
  try {
    const license = await License.findById(req.params.id);
    if (!license) {
      return res.status(404).json({ message: 'License not found' });
    }
    res.json(license);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateLicense = async (req, res) => {
  try {
    const updatedLicense = await License.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLicense) {
      return res.status(404).json({ message: 'License not found' });
    }
    res.json(updatedLicense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLicense = async (req, res) => {
  try {
    const deletedLicense = await License.findByIdAndDelete(req.params.id);
    if (!deletedLicense) {
      return res.status(404).json({ message: 'License not found' });
    }
    res.json({ message: 'License deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
