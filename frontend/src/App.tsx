import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import Home from './pages/home/home';
import CategoryPage from './pages/category-page/category-page';
import RegisterPage from './pages/authentication-page/register';
import LoginPage from './pages/authentication-page/login';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './pages/authentication-page/protectedRoute';
import CartPage from './pages/cart-page/CartPage';
import SubCategoryPage from './pages/subcategory-page/SubcategoryPage';

import { Toaster } from 'react-hot-toast';

import UserProfilePage from './pages/user-profile-page/user-profile-page'
import FavoritePage from './pages/favorite-page/favorite-page'
import DistributorProfilePage from './pages/distributor-profile-page/distributor-profile-page';

import PublicRoute from './pages/authentication-page/publicRoute';
import DistributorProductPage from './pages/distributor-product-page/distributor-product-page';
import Order from './pages/order-page/order';
import ProductPage from './pages/product-page/product-page';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CreateOrder from './pages/order-page/create-order';
import CheckoutPage from './pages/checkout-page/checkout-page';
import OrderSummaryPage from './pages/order-summary-page/order-summary-page';
const stripePromise = loadStripe('pk_test_51PldaG2KhZgwiVa57G1QWSC67ilvXaJI8hsgRDB96syfOzPKrhDdC82rkEA1yhVRo7Q1VX19VbBBBRhCjTJOJMI600RomhFSQL');
const App = () => {
  const location = useLocation();
  const disableNavPaths = ['/login', '/register/customer', '/register/distributor', '/admin/login'];
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
            <Route path='/product/:productId' element={<ProductPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/:subcategory" element={<SubCategoryPage />} />
            <Route element={<PublicRoute/>}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register/:userRole" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkoutData" element={<CheckoutPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/distributor-dashboard/:id" element={<DistributorProfilePage />} />
              <Route path='/user-dashboard/:id' element={<UserProfilePage />} />
              <Route path="/distributor-dashboard/:id/add-product" element={<DistributorProductPage type="add-product" />} />
              <Route path="edit-product/:productId" element={<DistributorProductPage type="edit-product" />} />
              <Route path="/distributor-dashboard/:id/order/:orderId" element={<Order />} />
              <Route path="/user-dashboard/:id/order/:orderId" element={<Order />} />
              <Route path="/order/pay" element={<CreateOrder/>} />
              <Route path="/order/summary" element={<OrderSummaryPage/>} />

            </Route>
  
            
          </Routes>
          {showNav && <Footer />}
          <Toaster />
    
        </AuthProvider>

    </>
  );
};

export default App;
