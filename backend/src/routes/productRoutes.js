const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  getFilteredProducts, 
  getProductById 
} = require('../controllers/productController');

// GET /api/products - Get all products with calculated prices
router.get('/', getAllProducts);

// GET /api/products/filter - Get filtered products
router.get('/filter', getFilteredProducts);

// GET /api/products/:id - Get single product by ID
router.get('/:id', getProductById);

module.exports = router; 