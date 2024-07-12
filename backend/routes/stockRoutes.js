const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Routes for stocks API
router.get('/stocks', stockController.getAllStocks);
router.get('/stocks/:id', stockController.getStockById); // Fetch single stock
router.post('/stocks', stockController.createStock);
router.put('/stocks/:id', stockController.updateStock); // Update stock by ID
router.delete('/stocks/:id', stockController.deleteStock); // Delete stock by ID

module.exports = router;
