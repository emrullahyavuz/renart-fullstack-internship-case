const express = require('express');
const router = express.Router();
const { getCurrentGoldPrice } = require('../controllers/goldPriceController');

// GET /api/gold-price - Get current gold price
router.get('/', getCurrentGoldPrice);

module.exports = router; 