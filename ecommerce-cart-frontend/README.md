# E-Commerce Cart Frontend

Modern, responsive React frontend for the e-commerce shopping cart application.

## 🚀 Features

- **Product Browsing**: View all available products in a beautiful grid layout
- **Shopping Cart**: Add, update, and remove items from cart
- **Real-time Updates**: Cart updates instantly with quantity changes
- **Checkout Flow**: Complete checkout with customer information
- **Receipt Generation**: View detailed order receipt after purchase
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern UI**: Gradient backgrounds, smooth animations, and intuitive interface

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## 🛠️ Installation Steps

### 1. Create React App (if not already done)

```bash
npx create-react-app ecommerce-cart-frontend
cd ecommerce-cart-frontend
```

### 2. Install Dependencies

```bash
npm install axios react-router-dom lucide-react
```

### 3. Project Structure

Create the following folders and files:

```
src/
├── api/
│   └── cartApi.js
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── CartItem.jsx
│   └── CheckoutModal.jsx
├── pages/
│   ├── Products.jsx
│   ├── Cart.jsx
│   └── Receipt.jsx
├── context/
│   └── CartContext.jsx
├── App.js
├── App.css
└── index.js
```

### 4. Copy All Component Files

Copy the content from the artifacts into their respective files.

### 5. Configure API URL

In `src/api/cartApi.js`, ensure the API_BASE_URL matches your backend:

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

### 6. Start the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## 📡 API Integration

The frontend integrates with these backend endpoints:

### Products

- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product

### Cart

- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout

- `POST /api/checkout` - Process checkout

## 🎨 Design Features

### Color Scheme

- Primary Gradient: `#667eea` to `#764ba2`
- Success: `#10b981`
- Error: `#ef4444`
- Background: Subtle gradient from `#f5f7fa` to `#c3cfe2`

### Components

**Navbar**

- Sticky navigation with gradient background
- Real-time cart item count badge
- Smooth navigation between pages

**ProductCard**

- Image placeholder with product info
- "In Stock" / "Out of Stock" badge
- Add to cart button with loading state
- Hover effects and animations

**CartItem**

- Product image and details
- Quantity controls with +/- buttons
- Remove item button
- Real-time subtotal calculation

**CheckoutModal**

- Form validation
- Order summary with tax calculation
- Smooth modal animation
- Error handling

### Pages

**Products Page**

- Grid layout (responsive)
- Loading spinner
- Error handling with retry
- Smooth animations

**Cart Page**

- Cart items list
- Sticky order summary
- Clear cart option
- Empty cart state

**Receipt Page**

- Success confirmation
- Detailed order information
- Customer details
- Print receipt option
- Continue shopping button

## 🔧 State Management

Uses React Context API for global cart state:

```javascript
const {
  cart, // Cart data
  loading, // Loading state
  error, // Error messages
  addItem, // Add item function
  updateItem, // Update quantity
  removeItem, // Remove item
  clearAllItems, // Clear cart
  processCheckout, // Checkout function
} = useCart();
```

## 📱 Responsive Design

- **Desktop**: Full grid layout with sticky sidebar
- **Tablet**: Adjusted grid columns
- **Mobile**: Single column layout, stacked components

Breakpoints:

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

## 🎯 User Flow

1. **Browse Products**

   - View all available products
   - See product details and prices
   - Check stock availability

2. **Add to Cart**

   - Click "Add to Cart" button
   - Visual confirmation (button changes to "Added!")
   - Cart badge updates automatically

3. **View Cart**

   - Navigate to cart page
   - Adjust quantities with +/- buttons
   - Remove unwanted items
   - See real-time total calculation

4. **Checkout**

   - Click "Proceed to Checkout"
   - Fill in customer information
   - Review order summary
   - Complete purchase

5. **Receipt**
   - View order confirmation
   - See detailed receipt
   - Print or save receipt
   - Continue shopping

## 🚀 Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

## 🔗 Backend Integration

**Before starting the frontend, ensure:**

1. Backend server is running on `http://localhost:5000`
2. MongoDB Atlas is connected
3. CORS is enabled on backend
4. All API endpoints are working

**Test backend connection:**

```bash
curl http://localhost:5000/api/products
```

## 🎨 Customization

### Change Colors

Edit gradient colors in components:

```javascript
background: "linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%)";
```

### Modify Layout

Adjust grid columns in Products page:

```javascript
gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))";
```

### Update API URL

For production deployment, update in `src/api/cartApi.js`:

```javascript
const API_BASE_URL = "https://your-backend-url.com/api";
```

## 🐛 Troubleshooting

**Issue: Cart not updating**

- Check backend server is running
- Verify API URL is correct
- Check browser console for errors

**Issue: CORS errors**

- Ensure backend has CORS enabled
- Check API_BASE_URL matches backend

**Issue: Session not persisting**

- Session ID is generated on page load
- Clear browser cache if needed

## 📦 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `build/` folder
3. Update API_BASE_URL to production backend URL

### Environment Variables

Create `.env` file for production:

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

Update `cartApi.js`:

```javascript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
```

## 📝 Notes

- Session ID is generated randomly for each user
- Cart persists in backend database
- No authentication required (mock project)
- All prices in USD
- Tax calculated at 8%

## 🎉 Features Implemented

✅ Product listing with grid layout
✅ Add to cart functionality
✅ Cart management (add/update/remove)
✅ Real-time cart updates
✅ Checkout with form validation
✅ Receipt generation and display
✅ Responsive design
✅ Loading states
✅ Error handling
✅ Smooth animations
✅ Modern UI/UX

## 📧 Support

For issues or questions, please check the GitHub repository or contact the development team.

## 📄 License

ISC
