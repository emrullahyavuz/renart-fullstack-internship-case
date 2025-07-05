const express = require('express');
const app = express();
const cors = require('cors');


// Middleware setup
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});