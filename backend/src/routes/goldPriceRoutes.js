const express = require('express');
const router = express.Router();
const { getCurrentGoldPrice } = require('../controllers/goldPriceController');

/**
 * @swagger
 * /api/gold-price:
 *   get:
 *     summary: Get current gold price
 *     description: Retrieve the current gold price per gram in USD, fetched from external APIs
 *     tags: [Gold Price]
 *     responses:
 *       200:
 *         description: Current gold price information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoldPrice'
 *             example:
 *               goldPrice: 65.5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getCurrentGoldPrice);

module.exports = router; 