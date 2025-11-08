const Cart = require('../models/Cart');

const processCheckout = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    const { name, email } = req.body;
    
    const cart = await Cart.findOne({ sessionId }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    const subtotal = cart.items.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    const receiptId = `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const receipt = {
      receiptId,
      customer: { name, email },
      items: cart.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        subtotal: (item.productId.price * item.quantity).toFixed(2)
      })),
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      timestamp: new Date().toISOString(),
      paymentMethod: 'Mock Payment',
      status: 'Completed'
    };
    
    // Clear cart after checkout
    await Cart.findOneAndDelete({ sessionId });
    
    res.json({
      success: true,
      message: 'Checkout successful',
      data: receipt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { processCheckout };