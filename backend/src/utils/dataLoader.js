const fs = require('fs').promises;
const path = require('path');

// Function to load products from JSON file
async function loadProducts() {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

module.exports = {
  loadProducts
}; 