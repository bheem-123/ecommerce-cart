# E-Commerce Cart Backend API

Full-stack e-commerce shopping cart backend built with Node.js, Express, and MongoDB Atlas.

## Features

- RESTful API for e-commerce cart operations
- MongoDB Atlas integration for data persistence
- Mock products (5-10 items)
- Session-based cart management
- Mock checkout with receipt generation
- Error handling and validation
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ecommerce-cart-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string

### 4. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5050
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and cluster URL with your MongoDB Atlas credentials.

### 5. Run the application

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Products

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| GET    | `/api/products`     | Get all products (5-10 mock items) |
| GET    | `/api/products/:id` | Get single product by ID           |

### Cart

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| GET    | `/api/cart`     | Get cart with items and total |
| POST   | `/api/cart`     | Add item to cart              |
| PUT    | `/api/cart/:id` | Update cart item quantity     |
| DELETE | `/api/cart/:id` | Remove item from cart         |
| DELETE | `/api/cart`     | Clear entire cart             |

### Checkout

| Method | Endpoint        | Description                           |
| ------ | --------------- | ------------------------------------- |
| POST   | `/api/checkout` | Process checkout and generate receipt |

## Testing the API

### Using cURL

Make the script executable:

```bash
chmod +x curl-examples.sh
./curl-examples.sh
```

### Using Postman

1. Import `api-testing-examples.json` into Postman
2. Set the base URL to `http://localhost:5000/api`
3. Add header `session-id: user_12345` for cart operations
4. Run the collection

### Manual Testing Examples

**1. Get all products:**

```bash
curl http://localhost:5000/api/products
```

**2. Add item to cart:**

```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "session-id: user_12345" \
  -d '{"productId": "prod_1", "qty": 2}'
```

**3. Get cart:**

```bash
curl http://localhost:5000/api/cart \
  -H "session-id: user_12345"
```

**4. Checkout:**

```bash
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -H "session-id: user_12345" \
  -d '{"name": "John Doe", "email": "john.doe@example.com"}'
```

## Request/Response Examples

### Add to Cart

**Request:**

```json
POST /api/cart
Headers: {
  "Content-Type": "application/json",
  "session-id": "user_12345"
}
Body: {
  "productId": "prod_1",
  "qty": 2
}
```

**Response:**

```json
{
  "success": true,
  "message": "Product added to cart",
  "data": {
    "items": [
      {
        "productId": "prod_1",
        "name": "Wireless Headphones",
        "price": 79.99,
        "quantity": 2
      }
    ],
    "total": 159.98,
    "itemCount": 1
  }
}
```

### Checkout

**Request:**

```json
POST /api/checkout
Headers: {
  "Content-Type": "application/json",
  "session-id": "user_12345"
}
Body: {
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Checkout successful",
  "data": {
    "receiptId": "RCP-1699123456789-abc123xyz",
    "customer": {
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "items": [
      {
        "productId": "prod_1",
        "name": "Wireless Headphones",
        "price": 79.99,
        "quantity": 2,
        "subtotal": "159.98"
      }
    ],
    "subtotal": "159.98",
    "tax": "12.80",
    "total": "172.78",
    "timestamp": "2025-11-08T12:30:45.678Z",
    "paymentMethod": "Mock Payment",
    "status": "Completed"
  }
}
```

## Project Structure

```
ecommerce-cart-backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   ├── Cart.js              # Cart schema
│   │   └── User.js              # User schema
│   ├── controllers/
│   │   ├── productController.js # Product logic
│   │   ├── cartController.js    # Cart logic
│   │   └── checkoutController.js# Checkout logic
│   ├── routes/
│   │   ├── productRoutes.js     # Product routes
│   │   ├── cartRoutes.js        # Cart routes
│   │   └── checkoutRoutes.js    # Checkout routes
│   └── app.js                   # Express app setup
├── .env                         # Environment variables
├── .gitignore
├── server.js                    # Server entry point
├── package.json
├── README.md
├── api-testing-examples.json    # API collection
└── curl-examples.sh             # cURL test script
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## Assignment Requirements Checklist

- Backend APIs (Node.js/Express)
- GET /api/products - Returns 5-10 mock items
- POST /api/cart - Add product with quantity
- DELETE /api/cart/:id - Remove item
- GET /api/cart - Get cart + total
- POST /api/checkout - Generate mock receipt
- MongoDB/Atlas integration
- REST APIs
- Error handling
- Session management (session-id header)

## Notes

- The API uses session-id header for cart management (no authentication required for this mock)
- Products are auto-seeded when first accessed
- Cart persists in database based on session-id
- Checkout clears the cart and generates a mock receipt
- Tax is calculated as 8% of subtotal

## Deployment

For deployment to platforms like Heroku, Railway, or Render:

1. Ensure MongoDB Atlas is accessible from any IP (0.0.0.0/0)
2. Set environment variables on the platform
3. Use the start script: `npm start`

## Support

For questions or issues, please contact via the project repository.

## License

ISC
