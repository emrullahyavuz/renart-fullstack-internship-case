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
    console.log("response", response)
    
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

module.exports = {
  getGoldPrice,
  fetchGoldPrice
}; 