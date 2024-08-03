import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../components/controls/searchbar/searchBar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../hooks/useAuth";
import Dropdown from "../components/dropdown/dropdown";


const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <img className="logo" src="src\assets\Logo.png" alt="logo" />
            </NavLink>
          </li>
          <li className="search-bar-container">
            <SearchBar />
          </li>
          <div className="icons">
          <li className="nav-icons">
            <NavLink
              to={isAuthenticated ? `/user-dashboard/${user?.id}` : "/login"}
            >
              <AccountCircleIcon />
              <span className="nav-text">Account</span>
            </NavLink>
          </li>
          
          <li className="nav-icons">
            <NavLink to="/favorites">
              <FavoriteBorderIcon />
              <span className="nav-text">Favourites</span>
            </NavLink>
          </li>
          <li className="nav-icons">
            <NavLink to="/cart">
              <ShoppingCartIcon />
              <span className="nav-text">Cart</span>
            </NavLink>
          </li>
          </div>
        </ul>
      </nav>
      <div className="bottom-navbar">
        <Dropdown />
      </div>
    </div>
  );
};

export default Navbar;


//☰