import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api";
const SESSION_ID = "user_12345";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "session-id": SESSION_ID,
  },
});

// Products API
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Cart API
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (productId, qty = 1) => {
  const response = await api.post("/cart", { productId, qty });
  return response.data;
};

export const updateCartItem = async (productId, qty) => {
  const response = await api.put(`/cart/${productId}`, { qty });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};

// Checkout API
export const checkout = async (name, email) => {
  const response = await api.post("/checkout", { name, email });
  return response.data;
};

export default api;
