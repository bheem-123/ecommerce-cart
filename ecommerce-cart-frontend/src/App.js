import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Receipt from "./pages/Receipt";
import "./App.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/receipt" element={<Receipt />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
