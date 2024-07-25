import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import SearchBar from '../components/controls/searchbar/searchBar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { userId } = useAuth();

  


  return (
    <nav>
        <ul>
            <li>
                <NavLink to="/" >
                    <img  className="logo" src="src\assets\Logo.png" alt="logo" />
                </NavLink>
            </li>
            <li className="search-bar-container">
                <SearchBar />
            </li>
            <li className="nav-icons">
                <NavLink to={userId !== null ? "/myAccount" : "/login"}>
                    <AccountCircleIcon/>
                   <span className='nav-text'>Account</span>
                </NavLink>
            </li>
            <li className="nav-icons">
                <NavLink to="/Favorite">
                    <FavoriteBorderIcon/>
                    <span className='nav-text'>Favorites</span>
                </NavLink>
            </li>
            <li className="nav-icons">
                <NavLink to="/Cart">
                    <ShoppingCartIcon/>
                    <span className='nav-text'>Cart</span>
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
