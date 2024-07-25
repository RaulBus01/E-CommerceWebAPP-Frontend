import React from 'react'
import { Routes,Route } from 'react-router'
import Home from './pages/home-page/home'


import CategoryPage from './pages/category-page/category-page'
import UserProfilePage from './pages/user-profile-page/user-profile-page'
import FavoritePage from './pages/favorite-page/favorite-page'

const App = () => {
  return (
    
    <Routes >
      <Route path="/" element={<Home/>} />
      <Route path="/category" element={<CategoryPage/>} />
      <Route path="/myAccount" element={<UserProfilePage/>}/>
      <Route path="/Favorite" element={<FavoritePage/>}/>
    </Routes>
  )
}

export default App