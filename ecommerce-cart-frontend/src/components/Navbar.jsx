import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>
          <Store size={28} />
          <span style={styles.brandText}>Vibe Commerce</span>
        </Link>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Products
          </Link>
          <Link to="/cart" style={styles.cartLink}>
            <ShoppingCart size={24} />
            {cart.itemCount > 0 && (
              <span style={styles.badge}>{cart.itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "1rem 0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    color: "white",
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  brandText: {
    fontSize: "1.5rem",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    transition: "opacity 0.3s",
  },
  cartLink: {
    position: "relative",
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "#ef4444",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
};

export default Navbar;
