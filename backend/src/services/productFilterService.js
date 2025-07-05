const axios = require('axios');

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
    const response = await axios.get('https://api.metals.live/v1/spot/gold');
    
    if (response.data && response.data.length > 0) {
      const goldData = response.data[0];
      return goldData.price || 65.5; // Fallback to default if no price
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