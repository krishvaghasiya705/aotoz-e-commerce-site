const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add', productController.addProduct);
router.get('/all', productController.getAllProducts);
router.put('/update/:id', productController.updateProduct);

module.exports = router;
