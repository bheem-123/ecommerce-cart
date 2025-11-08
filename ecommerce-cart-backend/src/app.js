const express = require("express");
const cors = require("cors");

// Import routes
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Cart API",
    version: "1.0.0",
    endpoints: {
      products: {
        "GET /api/products": "Get all products",
        "GET /api/products/:id": "Get single product",
      },
      cart: {
        "GET /api/cart": "Get cart with total",
        "POST /api/cart": "Add item to cart",
        "PUT /api/cart/:id": "Update cart item",
        "DELETE /api/cart/:id": "Remove item from cart",
        "DELETE /api/cart": "Clear cart",
      },
      checkout: {
        "POST /api/checkout": "Process checkout",
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

module.exports = app;
