import React from 'react'
import { Routes,Route } from 'react-router'
import Home from './pages/home-page/home'

import CategoryPage from './pages/category-page/category-page'

const App = () => {
  return (
    <Routes >
      <Route path="/" element={<Home/>} />
      <Route path="/category" element={<CategoryPage/>} />
    </Routes>
  )
}

export default App