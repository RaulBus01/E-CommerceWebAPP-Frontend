import React from 'react';
import { NavLink } from 'react-router-dom'
import './Footer.css';

const Footer = () => {
  return (
    <footer>
        <div className="footer-container">
            <div className="footer-section">
                <div className="footer-section-title">Shop</div>
                <ul>
                    <li><NavLink to="/Products">Products</NavLink></li>
                    <li><NavLink to="/Collections">Collections</NavLink></li>
                </ul>
            </div>
            <div className="footer-section">
                <div className="footer-section-title">HELP</div>
                <ul>
                    <li><NavLink to="/ContactUs">Contact Us</NavLink></li>
                    <li><NavLink to="/FAQ">FAQ</NavLink></li>
                    <li><NavLink to="/Returns">Returns</NavLink></li>
                    <li><NavLink to="/Shipping">Shipping</NavLink></li>
                </ul>
            </div>
            <div className="footer-section">
                <div className="footer-section-title">ABOUT</div>
                <ul>
                    <li><NavLink to="/AboutUs">About Us</NavLink></li>
                    <li><NavLink to="/Privacy">Privacy Policy</NavLink></li>
                    <li><NavLink to="/Terms&Conditions">Terms & Conditions</NavLink></li>
                </ul>
            </div>
            <div className="footer-subscribe">
                <p>Sign up to get 10% off your first order</p>
                <form id="subscribe-form">
                    <input type="email" placeholder="Enter your email address" />
                    <button type="submit">Subscribe</button>
                </form>
                <div className="social-icons">
                   
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <ul>
                <li> @ 2024 E-Website</li>
             
            </ul>
        </div>
    </footer>

    );
};

export default Footer;