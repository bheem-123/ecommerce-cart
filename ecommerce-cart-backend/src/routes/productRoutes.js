const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/', createProduct);

module.exports = router;
