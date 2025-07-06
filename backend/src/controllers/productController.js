const { loadProducts } = require("../utils/dataLoader");
const { calculatePrice } = require("../utils/priceCalculator");
const { getGoldPrice } = require("../services/goldPriceService");
const { filterProducts } = require("../services/productFilterService");
const filterSchema = require("../validators/filterSchema");

// Get all products with calculated prices
async function getAllProducts(req, res) {
  try {
    const products = await loadProducts();
    const goldPrice = await getGoldPrice();

    // Add calculated prices to products
    const productsWithPrices = products.map((product) => ({
      ...product,
      price: calculatePrice(product.popularityScore, product.weight, goldPrice),
    }));

    res.json({
      products: productsWithPrices,
      goldPrice: goldPrice,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get filtered products
async function getFilteredProducts(req, res) {
  try {
    // joi validation for query params
    const { error, value } = filterSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;

    const filters = {};
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (minPopularity) filters.minPopularity = parseFloat(minPopularity);
    if (maxPopularity) filters.maxPopularity = parseFloat(maxPopularity);

    const products = await loadProducts();
    const goldPrice = await getGoldPrice();

    // Add calculated prices to products
    const productsWithPrices = products.map((product) => ({
      ...product,
      price: calculatePrice(product.popularityScore, product.weight, goldPrice),
    }));

    // Apply filters
    const filteredProducts = filterProducts(
      productsWithPrices,
      filters,
      goldPrice
    );

    res.json({
      products: filteredProducts,
      goldPrice: goldPrice,
      filters: filters,
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get single product by ID
async function getProductById(req, res) {
  try {
    const products = await loadProducts();
    const goldPrice = await getGoldPrice();

    const product = products.find((p) => p.id === parseInt(req.params.id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productWithPrice = {
      ...product,
      price: calculatePrice(product.popularityScore, product.weight, goldPrice),
    };

    res.json({
      product: productWithPrice,
      goldPrice: goldPrice,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllProducts,
  getFilteredProducts,
  getProductById,
};
