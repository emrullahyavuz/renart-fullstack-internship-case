const express = require('express');
const app = express();
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');
const goldPriceRoutes = require('./src/routes/goldPriceRoutes');


// Middleware setup
app.use(cors());
app.use(express.json());

const PORT = 3000;

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/gold-price', goldPriceRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});