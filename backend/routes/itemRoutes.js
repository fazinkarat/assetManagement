const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Routes for items API
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItemById); // Fetch single item
router.post('/items', itemController.createItem);
router.put('/items/:id', itemController.updateItem); // Update item by ID
router.delete('/items/:id', itemController.deleteItem); // Delete item by ID

module.exports = router;
