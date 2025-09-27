import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Pages
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import AdminProductsPage from './pages/AdminProductsPage.jsx';
import ProductEditPage from './pages/ProductEditPage.jsx';

// Import Layouts and Protected Routes
import MainLayout from './components/layout/MainLayout.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AdminRoute from './components/auth/AdminRoute.jsx';

function App() {
  return (
    <Routes>
      {/* Public routes that are standalone */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* This is now the protected area of your application */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* All routes inside here are for logged-in users only */}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          
          {/* Nested protection for Admin-only routes */}
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