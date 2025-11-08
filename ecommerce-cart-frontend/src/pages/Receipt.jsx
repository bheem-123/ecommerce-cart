import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Receipt = () => {
  const navigate = useNavigate();
  const { receipt } = useCart();

  if (!receipt) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No Receipt Found</h2>
        <button onClick={() => navigate('/')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ border: '2px solid #28a745', borderRadius: '8px', padding: '2rem', backgroundColor: '#f8f9fa' }}>
        <h2 style={{ textAlign: 'center', color: '#28a745' }}>Order Receipt</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Receipt ID:</strong> {receipt.receiptId}
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Customer:</strong> {receipt.customer.name} ({receipt.customer.email})
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}
        </div>
        
        <h3>Items:</h3>
        {receipt.items.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
            <span>{item.name} (x{item.quantity})</span>
            <span>${item.subtotal}</span>
          </div>
        ))}
        
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal:</span>
            <span>${receipt.subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Tax:</span>
            <span>${receipt.tax}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>${receipt.total}</span>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#28a745', fontWeight: 'bold' }}>Status: {receipt.status}</p>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              padding: '0.8rem 2rem', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;