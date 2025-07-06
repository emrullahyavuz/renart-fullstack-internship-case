const axios = require('axios');
require('dotenv').config();

// Cache for gold price to avoid excessive API calls
let goldPriceCache = {
  price: 65.5, // Default fallback price
  lastUpdated: 0,
  cacheDuration: 5 * 60 * 1000 // 5 minutes
};

// Function to fetch real-time gold price
async function fetchGoldPrice() {
  try {
    // Using a free gold price API
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': process.env.GOLD_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.currency && response.data.price_gram_24k > 0) {
      const goldData = response.data.price_gram_24k;
      return goldData || 65.5; // Fallback to default if no price
    }
    
    return 65.5; // Fallback price
  } catch (error) {
    console.error('Error fetching gold price:', error.message);
    return 65.5; // Fallback price
  }
}

// Function to get cached gold price or fetch new one
async function getGoldPrice() {
  const now = Date.now();
  
  if (now - goldPriceCache.lastUpdated > goldPriceCache.cacheDuration) {
    const newPrice = await fetchGoldPrice();
    goldPriceCache = {
      price: newPrice,
      lastUpdated: now,
      cacheDuration: 5 * 60 * 1000
    };
  }
  
  return goldPriceCache.price;
}

// Function to filter products based on criteria
function filterProducts(products, filters, goldPrice) {
  let filteredProducts = [...products];

  // Apply price filters
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= filters.minPrice
    );
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.price <= filters.maxPrice
    );
  }

  // Apply popularity filters
  if (filters.minPopularity !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.popularityScore >= filters.minPopularity
    );
  }

  if (filters.maxPopularity !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.popularityScore <= filters.maxPopularity
    );
  }

  // Apply weight filters
  if (filters.minWeight !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.weight >= filters.minWeight
    );
  }

  if (filters.maxWeight !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.weight <= filters.maxWeight
    );
  }

  // Apply sorting
  if (filters.sortBy) {
    const [field, direction] = filters.sortBy.split('-');
    filteredProducts.sort((a, b) => {
      let aValue, bValue;
      
      switch (field) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'popularity':
          aValue = a.popularityScore;
          bValue = b.popularityScore;
          break;
        case 'weight':
          aValue = a.weight;
          bValue = b.weight;
          break;
        default:
          return 0;
      }
      
      if (direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }

  return filteredProducts;
}

module.exports = {
  getGoldPrice,
  fetchGoldPrice,
  filterProducts
}; 