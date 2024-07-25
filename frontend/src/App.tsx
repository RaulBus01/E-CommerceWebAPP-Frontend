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

import { Toaster } from 'react-hot-toast';

import UserProfilePage from './pages/user-profile-page/user-profile-page'
import FavoritePage from './pages/favorite-page/favorite-page'

const App = () => {
  const location = useLocation();
  const disableNavPaths = ['/login', '/register'];
  const showNav = !disableNavPaths.includes(location.pathname);

  return (
    <>
      <AuthProvider>
        {showNav && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/myAccount" element={<UserProfilePage />} />
            <Route path="/Favorite" element={<FavoritePage />} />
          </Route>
        </Routes>
        {showNav && <Footer />}
        <Toaster />
      </AuthProvider>
    </>
  );
};

export default App;
