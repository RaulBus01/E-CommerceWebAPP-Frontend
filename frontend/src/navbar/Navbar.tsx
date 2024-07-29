import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../components/controls/searchbar/searchBar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { userId } = useAuth();

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
          <li className="nav-icons">
            <NavLink
              to={userId !== null ? `/user-dashboard/${userId}` : "/login"}
            >
              <AccountCircleIcon />
              <span className="nav-text">Account</span>
            </NavLink>
          </li>
          <li className="nav-icons">
            <NavLink to="/Favorite">
              <FavoriteBorderIcon />
              <span className="nav-text">Favorites</span>
            </NavLink>
          </li>
          <li className="nav-icons">
            <NavLink to="/cart">
              <ShoppingCartIcon />
              <span className="nav-text">Cart</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="bottom-navbar">
        <button className="menu-button">Books</button>
        <span className="nav-item">Fiction</span>
        <span className="nav-item">Nonfiction</span>
        <span className="nav-item">Academic & Textbooks</span>
        <span className="nav-item">eBooks</span>
        <span className="nav-item">Audiobooks</span>
        <span className="nav-item">Book Accessories & Gifts</span>
      </div>
    </div>
  );
};

export default Navbar;


//☰