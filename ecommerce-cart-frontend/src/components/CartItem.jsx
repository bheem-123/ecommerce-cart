import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useCart();

  const handleQuantityChange = (newQty) => {
    if (newQty > 0) {
      updateItem(item.productId, newQty);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', margin: '0.5rem 0' }}>
      <div>
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Quantity:</span>
          <button onClick={() => handleQuantityChange(item.quantity - 1)} style={{ padding: '0.2rem 0.5rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px' }}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item.quantity + 1)} style={{ padding: '0.2rem 0.5rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px' }}>+</button>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button 
          onClick={() => removeItem(item.productId)}
          style={{ 
            padding: '0.3rem 0.8rem', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;