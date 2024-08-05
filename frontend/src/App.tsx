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
import DistributorProfilePage from './pages/distributor-profile-page/distributor-profile-page';

import PublicRoute from './pages/authentication-page/publicRoute';
import AddProductPage from './pages/add-product/add-product';

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
              <Route path="/distributor-dashboard/:id" element={<DistributorProfilePage />} />
              <Route path='/user-dashboard/:id' element={<UserProfilePage />} />
              <Route path="/distributor-dashboard/:id/add-product" element={<AddProductPage />} />
          
            </Route>
          </Routes>
          {showNav && <Footer />}
          <Toaster />
        </AuthProvider>

    </>
  );
};

export default App;
