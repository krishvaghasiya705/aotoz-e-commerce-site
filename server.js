const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
