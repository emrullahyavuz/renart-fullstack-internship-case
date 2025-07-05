// Function to calculate product price
function calculatePrice(popularityScore, weight, goldPrice) {
  return (popularityScore + 1) * weight * goldPrice;
}

module.exports = {
  calculatePrice
}; 