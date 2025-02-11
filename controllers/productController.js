const products = [];

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
};

exports.createProduct = (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Product not found');

  products.splice(productIndex, 1);
  res.status(204).send();
};
