const Joi = require('joi');

const filterSchema = Joi.object({
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  minPopularity: Joi.number().min(0).max(1),
  maxPopularity: Joi.number().min(0).max(1),
  minWeight: Joi.number().min(0),
  maxWeight: Joi.number().min(0),
  sortBy: Joi.string().valid('price-asc', 'price-desc', 'popularity-asc', 'popularity-desc', 'weight-asc', 'weight-desc')
});

module.exports = filterSchema;