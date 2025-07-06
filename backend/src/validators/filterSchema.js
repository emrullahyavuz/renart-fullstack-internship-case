const Joi = require('joi');

const filterSchema = Joi.object({
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  minPopularity: Joi.number().min(0).max(100),
  maxPopularity: Joi.number().min(0).max(100)
});

module.exports = filterSchema;