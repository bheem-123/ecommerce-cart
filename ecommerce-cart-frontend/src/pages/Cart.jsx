import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CheckoutModal from '../components/CheckoutModal';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, clearAllItems } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckoutSuccess = (receipt) => {
    navigate('/receipt');
  };

  if (cart.items.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <button 
          onClick={() => navigate('/')}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shopping Cart</h2>
      <div>
        {cart.items.map(item => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Total: ${cart.total}</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setShowCheckout(true)}
            style={{ 
              flex: 1,
              padding: '0.8rem 2rem', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            Proceed to Checkout
          </button>
          <button 
            onClick={clearAllItems}
            style={{ 
              padding: '0.8rem 1rem', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
      <CheckoutModal 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
};

export default Cart;