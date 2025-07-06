const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Renart Jewelry API',
      version: '1.0.0',
      description: 'API for managing jewelry products with real-time gold price calculations',
      contact: {
        name: 'API Support',
        email: 'support@renart.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique product identifier',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Product name',
              example: 'Engagement Ring 1'
            },
            popularityScore: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              description: 'Product popularity score (0-1)',
              example: 0.85
            },
            weight: {
              type: 'number',
              format: 'float',
              minimum: 0,
              description: 'Product weight in grams',
              example: 2.1
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Calculated price based on gold price and popularity',
              example: 123.45
            },
            images: {
              type: 'object',
              properties: {
                yellow: {
                  type: 'string',
                  format: 'uri',
                  description: 'Yellow gold variant image URL'
                },
                rose: {
                  type: 'string',
                  format: 'uri',
                  description: 'Rose gold variant image URL'
                },
                white: {
                  type: 'string',
                  format: 'uri',
                  description: 'White gold variant image URL'
                }
              },
              description: 'Product images for different gold variants'
            }
          },
          required: ['id', 'name', 'popularityScore', 'weight', 'images']
        },
        ProductList: {
          type: 'object',
          properties: {
            products: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Product'
              }
            },
            goldPrice: {
              type: 'number',
              format: 'float',
              description: 'Current gold price per gram in USD',
              example: 65.5
            }
          }
        },
        FilteredProducts: {
          type: 'object',
          properties: {
            products: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Product'
              }
            },
            goldPrice: {
              type: 'number',
              format: 'float',
              description: 'Current gold price per gram in USD'
            },
            filters: {
              type: 'object',
              properties: {
                minPrice: {
                  type: 'number',
                  description: 'Minimum price filter applied'
                },
                maxPrice: {
                  type: 'number',
                  description: 'Maximum price filter applied'
                },
                minPopularity: {
                  type: 'number',
                  description: 'Minimum popularity filter applied'
                },
                maxPopularity: {
                  type: 'number',
                  description: 'Maximum popularity filter applied'
                }
              }
            }
          }
        },
        SingleProduct: {
          type: 'object',
          properties: {
            product: {
              $ref: '#/components/schemas/Product'
            },
            goldPrice: {
              type: 'number',
              format: 'float',
              description: 'Current gold price per gram in USD'
            }
          }
        },
        GoldPrice: {
          type: 'object',
          properties: {
            goldPrice: {
              type: 'number',
              format: 'float',
              description: 'Current gold price per gram in USD',
              example: 65.5
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Validation error message'
            }
          }
        }
      },
      parameters: {
        ProductId: {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Product ID',
          schema: {
            type: 'integer',
            minimum: 1
          },
          example: 1
        },
        MinPrice: {
          name: 'minPrice',
          in: 'query',
          description: 'Minimum price filter',
          schema: {
            type: 'number',
            minimum: 0
          },
          example: 100
        },
        MaxPrice: {
          name: 'maxPrice',
          in: 'query',
          description: 'Maximum price filter',
          schema: {
            type: 'number',
            minimum: 0
          },
          example: 500
        },
        MinPopularity: {
          name: 'minPopularity',
          in: 'query',
          description: 'Minimum popularity score (0-100)',
          schema: {
            type: 'number',
            minimum: 0,
            maximum: 100
          },
          example: 50
        },
        MaxPopularity: {
          name: 'maxPopularity',
          in: 'query',
          description: 'Maximum popularity score (0-100)',
          schema: {
            type: 'number',
            minimum: 0,
            maximum: 100
          },
          example: 90
        }
      }
    },
    tags: [
      {
        name: 'Products',
        description: 'Product management endpoints'
      },
      {
        name: 'Gold Price',
        description: 'Gold price information endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
