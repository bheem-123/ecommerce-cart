const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    const cart = await Cart.findOne({ sessionId }).populate('items.productId');
    
    if (!cart) {
      return res.json({ items: [], total: 0, itemCount: 0 });
    }
    
    const total = cart.items.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
    
    res.json({
      items: cart.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity
      })),
      total: total.toFixed(2),
      itemCount: cart.items.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    const { productId, qty } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }
    
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ productId, quantity: qty });
    }
    
    await cart.save();
    await cart.populate('items.productId');
    
    const total = cart.items.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
    
    res.json({
      success: true,
      message: 'Product added to cart',
      data: {
        items: cart.items.map(item => ({
          productId: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity
        })),
        total: total.toFixed(2),
        itemCount: cart.items.length
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    const productId = req.params.id;
    
    const cart = await Cart.findOne({ sessionId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
      await cart.populate('items.productId');
    }
    
    const total = cart ? cart.items.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0) : 0;
    
    res.json({
      success: true,
      message: 'Item removed from cart',
      data: {
        items: cart ? cart.items.map(item => ({
          productId: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity
        })) : [],
        total: total.toFixed(2),
        itemCount: cart ? cart.items.length : 0
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    const productId = req.params.id;
    const { qty } = req.body;
    
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    item.quantity = qty;
    await cart.save();
    await cart.populate('items.productId');
    
    const total = cart.items.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
    
    res.json({
      success: true,
      message: 'Cart item updated',
      data: {
        items: cart.items.map(item => ({
          productId: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity
        })),
        total: total.toFixed(2),
        itemCount: cart.items.length
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    await Cart.findOneAndDelete({ sessionId });
    
    res.json({
      success: true,
      message: 'Cart cleared',
      data: { items: [], total: 0, itemCount: 0 }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };