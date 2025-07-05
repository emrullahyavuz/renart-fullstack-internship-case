const { getGoldPrice } = require('../services/goldPriceService');

// Get current gold price
async function getCurrentGoldPrice(req, res) {
  try {
    const goldPrice = await getGoldPrice();
    res.json({ goldPrice });
  } catch (error) {
    console.error('Error fetching gold price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getCurrentGoldPrice
}; 