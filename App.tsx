import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Public Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';

// Customer Pages
import CustomerDashboard from '@/pages/customer/Dashboard';
import OrdersPage from '@/pages/customer/OrdersPage';
import OrderDetailPage from '@/pages/customer/OrderDetailPage';
import WishlistPage from '@/pages/customer/WishlistPage';
import WalletPage from '@/pages/customer/WalletPage';
import ProfilePage from '@/pages/customer/ProfilePage';

// Seller Pages
import SellerDashboard from '@/pages/seller/Dashboard';
import SellerProductsPage from '@/pages/seller/ProductsPage';
import SellerOrdersPage from '@/pages/seller/OrdersPage';
import ShopSettingsPage from '@/pages/seller/ShopSettingsPage';

// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsersPage from '@/pages/admin/UsersPage';
import AdminCategoriesPage from '@/pages/admin/CategoriesPage';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CustomerDashboard />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Seller Routes */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SellerDashboard />} />
          <Route path="products" element={<SellerProductsPage />} />
          <Route path="orders" element={<SellerOrdersPage />} />
          <Route path="shop" element={<ShopSettingsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
