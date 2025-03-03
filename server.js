const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const productRoutes = require('./routes/productRoutes');

app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
