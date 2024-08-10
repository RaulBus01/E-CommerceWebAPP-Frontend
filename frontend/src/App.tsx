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
import PaymentCheckoutPage from './pages/payment-checkout-page/PaymentCheckoutPage';
import SubCategoryPage from './pages/subcategory-page/SubcategoryPage';

import { Toaster } from 'react-hot-toast';

import UserProfilePage from './pages/user-profile-page/user-profile-page'
import FavoritePage from './pages/favorite-page/favorite-page'
import PublicRoute from './pages/authentication-page/publicRoute';
import DistributorProductPage from './pages/distributor-product-page/distributor-product-page';
import Order from './pages/order-page/order';
import ProductPage from './pages/product-page/product-page';

const App = () => {
  const location = useLocation();
  const disableNavPaths = ['/login', '/register/customer', '/register/distributor', '/admin/login'];
  const showNav = !disableNavPaths.includes(location.pathname);
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
              <Route path="/checkout" element={<PaymentCheckoutPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/distributor-dashboard/:id" element={<UserProfilePage />} />
              <Route path='/user-dashboard/:id' element={<UserProfilePage />} />
              <Route path='/admin-dashboard' element={<UserProfilePage />} />
              <Route path="/add-product" element={<DistributorProductPage type="add-product" />} />
              <Route path="edit-product/:productId" element={<DistributorProductPage type="edit-product" />} />
              <Route path="/order/:orderId" element={<Order />} />
              <Route path="/user-dashboard/:id/order/:orderId" element={<Order />} />
            </Route>
  
            
          </Routes>
          {showNav && <Footer />}
          <Toaster />
        </AuthProvider>

    </>
  );
};

export default App;
