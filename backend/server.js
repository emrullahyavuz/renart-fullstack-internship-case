require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const productRoutes = require('./src/routes/productRoutes');
const goldPriceRoutes = require('./src/routes/goldPriceRoutes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger.config");
const corsOptions = require('./src/config/cors.config');

// Middleware setup
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/gold-price', goldPriceRoutes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
  res.send('Welcome to the Renart Jewellery API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});