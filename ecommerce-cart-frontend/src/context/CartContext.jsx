import React, { createContext, useState, useContext, useEffect } from "react";
import * as cartApi from "../api/cartApi";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartApi.getCart();
      setCart(response.data || { items: [], total: 0, itemCount: 0 });
      setError(null);
    } catch (err) {
      setError("Failed to fetch cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, qty = 1) => {
    try {
      setLoading(true);
      const response = await cartApi.addToCart(productId, qty);
      setCart(response.data);
      setError(null);
      return response;
    } catch (err) {
      setError("Failed to add item to cart");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (productId, qty) => {
    try {
      setLoading(true);
      const response = await cartApi.updateCartItem(productId, qty);
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to update item");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setLoading(true);
      const response = await cartApi.removeFromCart(productId);
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to remove item");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearAllItems = async () => {
    try {
      setLoading(true);
      const response = await cartApi.clearCart();
      setCart(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to clear cart");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      setLoading(true);
      const response = await cartApi.getProductById(id);
      setError(null);
      return response;
    } catch (err) {
      setError("Failed to fetch product");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const processCheckout = async (name, email) => {
    try {
      setLoading(true);
      const response = await cartApi.checkout(name, email);
      await fetchCart(); // Refresh cart after checkout
      setError(null);
      return response;
    } catch (err) {
      setError("Failed to process checkout");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    loading,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearAllItems,
    getProductById,
    processCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
