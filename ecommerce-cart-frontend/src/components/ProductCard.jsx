import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', margin: '1rem', width: '250px' }}>
      <h3>{product.name}</h3>
      <p style={{ color: '#666' }}>{product.description}</p>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff' }}>${product.price}</p>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>Stock: {product.stock}</p>
      <button 
        onClick={() => addItem(product._id)}
        style={{ 
          width: '100%', 
          padding: '0.5rem', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;