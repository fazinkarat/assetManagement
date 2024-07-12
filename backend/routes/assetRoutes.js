const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// Routes for assets API
router.get('/assets', assetController.getAllAssets);
router.get('/assets/:id', assetController.getAssetById); // Fetch single asset
router.post('/assets', assetController.createAsset);
router.put('/assets/:id', assetController.updateAsset); // Update asset by ID
router.delete('/assets/:id', assetController.deleteAsset); // Delete asset by ID

module.exports = router;
