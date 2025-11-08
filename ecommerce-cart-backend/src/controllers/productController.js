const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    
    if (products.length === 0) {
      const mockProducts = [
        { id: 'prod_1', name: 'Wireless Headphones', price: 79.99, description: 'Premium headphones', stock: 50 },
        { id: 'prod_2', name: 'Smart Watch', price: 199.99, description: 'Fitness tracker', stock: 30 },
        { id: 'prod_3', name: 'Laptop Stand', price: 49.99, description: 'Adjustable stand', stock: 25 },
        { id: 'prod_4', name: 'Mechanical Keyboard', price: 129.99, description: 'RGB keyboard', stock: 15 },
        { id: 'prod_5', name: 'Wireless Mouse', price: 39.99, description: 'Ergonomic mouse', stock: 40 },
        { id: 'prod_6', name: 'USB-C Hub', price: 59.99, description: '7-in-1 hub', stock: 20 },
        { id: 'prod_7', name: 'Desk Lamp', price: 34.99, description: 'LED lamp', stock: 35 }
      ];
      products = await Product.insertMany(mockProducts);
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProducts, createProduct };
