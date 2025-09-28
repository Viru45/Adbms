import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import AdminProductsPage from './pages/AdminProductsPage.jsx';
import ProductEditPage from './pages/ProductEditPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import CartPage from './pages/CartPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
// No need to re-import these, just showing for context
// import ShippingPage from './pages/ShippingPage.jsx';
// import PaymentPage from './pages/PaymentPage.jsx';
// import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
// import OrderHistoryPage from './pages/OrderHistoryPage.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';

// Import Layouts and Protected Routes
import MainLayout from './components/layout/MainLayout.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AdminRoute from './components/auth/AdminRoute.jsx';

function App() {
  return (
    <Routes>
      {/* Standalone routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes with Main Layout */}
      <Route element={<MainLayout />}>
        {/* Public Routes with Pagination */}
        <Route path="/" element={<HomePage />} />
        <Route path="/page/:pageNumber" element={<HomePage />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<SearchPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category/:categoryName/page/:pageNumber" element={<CategoryPage />} />
        
        {/* Other Public Routes */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* ... all your other protected routes from before ... */}
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route element={<AdminRoute />}>
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;