const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 700 },
  { id: 3, name: "Tablet", price: 400 },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
