const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  getFilteredProducts, 
  getProductById 
} = require('../controllers/productController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with calculated prices
 *     description: Retrieve all jewelry products with real-time price calculations based on current gold price
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products with calculated prices
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductList'
 *             example:
 *               products:
 *                 - id: 1
 *                   name: "Engagement Ring 1"
 *                   popularityScore: 0.85
 *                   weight: 2.1
 *                   price: 123.45
 *                   images:
 *                     yellow: "https://example.com/yellow.jpg"
 *                     rose: "https://example.com/rose.jpg"
 *                     white: "https://example.com/white.jpg"
 *               goldPrice: 65.5
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products/filter:
 *   get:
 *     summary: Get filtered products
 *     description: Retrieve products filtered by price and popularity criteria
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/MinPrice'
 *       - $ref: '#/components/parameters/MaxPrice'
 *       - $ref: '#/components/parameters/MinPopularity'
 *       - $ref: '#/components/parameters/MaxPopularity'
 *     responses:
 *       200:
 *         description: Filtered list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FilteredProducts'
 *             example:
 *               products:
 *                 - id: 1
 *                   name: "Engagement Ring 1"
 *                   popularityScore: 0.85
 *                   weight: 2.1
 *                   price: 123.45
 *                   images:
 *                     yellow: "https://example.com/yellow.jpg"
 *                     rose: "https://example.com/rose.jpg"
 *                     white: "https://example.com/white.jpg"
 *               goldPrice: 65.5
 *               filters:
 *                 minPrice: 100
 *                 maxPrice: 500
 *                 minPopularity: 50
 *                 maxPopularity: 90
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/filter', getFilteredProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a specific product by its ID with calculated price
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       200:
 *         description: Product details with calculated price
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleProduct'
 *             example:
 *               product:
 *                 id: 1
 *                 name: "Engagement Ring 1"
 *                 popularityScore: 0.85
 *                 weight: 2.1
 *                 price: 123.45
 *                 images:
 *                   yellow: "https://example.com/yellow.jpg"
 *                   rose: "https://example.com/rose.jpg"
 *                   white: "https://example.com/white.jpg"
 *               goldPrice: 65.5
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Product not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getProductById);

module.exports = router; 