import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home-page/home-page';
import CategoryPage from './pages/category-page/category-page';
import RegisterPage from './pages/authentication-page/register';
import LoginPage from './pages/authentication-page/login';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import AuthProvider from './hooks/useAuth';
import PrivateRoute from './pages/authentication-page/privateRoute';
import PublicRoute from './pages/authentication-page/publicRoute';
import CartPage from './pages/cart-page/CartPage';
import PaymentCheckoutPage from './pages/payment-checkout-page/PaymentCheckoutPage';

import { Toaster } from 'react-hot-toast';

import UserProfilePage from './pages/user-profile-page/user-profile-page'
import FavoritePage from './pages/favorite-page/favorite-page'
import DistributorProfilePage from './pages/distributor-profile-page/distributor-profile-page';
import AddProductPage from './pages/add-product/add-product';
import EditProductPage from './pages/edit-product/edit-product';

const App = () => {
  const location = useLocation();
  const disableNavPaths = ['/login', '/register', '/distributor/login', '/distributor/register', '/admin/login', '/distributor-dashboard/:id/add-product'];
  const showNav = !disableNavPaths.includes(location.pathname);
  // const showNav = !disableNavPaths.some(path => {
  //   const regexPath = path.replace(/:\w+/g, '[^/]+');
  //   const regex = new RegExp(`^${regexPath}$`);
  //   return regex.test(location.pathname);
  // });
  return (
    <>
      <AuthProvider>
        {showNav && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route element={<PublicRoute />}>
            
            <Route path="/register" element={<RegisterPage userType='User' />} />
            <Route path="/login" element={<LoginPage  userType='User'/>} />
            <Route path="/distributor/register" element={<RegisterPage userType='Distributor'/>} />
            <Route path="/distributor/login" element={<LoginPage userType='Distributor' />} />
            <Route path="/admin/login" element={<LoginPage userType='Admin' />} />
          
          </Route>
          <Route element={<PrivateRoute  userType='User'/>}>
            <Route path="/user-dashboard/:id" element={<UserProfilePage />} />
            <Route path="/Favorite" element={<FavoritePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
          <Route element={<PrivateRoute  userType='Distributor'/>}>
            <Route path="/distributor-dashboard/:id" element={<DistributorProfilePage />} />
            <Route path="/distributor-dashboard/:userId/add-product" element={<AddProductPage/>} />
            <Route path="/distributor-dashboard/:userId/edit-product/:productId" element={<EditProductPage/>} />
          </Route>
          <Route element={<PrivateRoute  userType='Admin'/>}>
            <Route path="/admin-dashboard" element={<div>Admin Dashboard</div>} />
          </Route>
        </Routes>
        {showNav && <Footer />}
        <Toaster />
      </AuthProvider>
    </>
  );
};

export default App;
