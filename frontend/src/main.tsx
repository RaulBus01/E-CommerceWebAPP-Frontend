import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import Navbar from './navbar/Navbar.tsx'
import Footer from './footer/Footer.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
        <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
)
