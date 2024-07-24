import React from "react";
import "./category-page.css";
import { NavLink } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card";
const CategoryPage = () => {
    return(
        <>
            <div className="main-container">
                <h2 className="title">Category name</h2>
                <div className="info-container">
                    <div className="subcat-container">
                        <nav className="nav-container">
                            <ul className="list">
                                <li className="list-element">
                                    <NavLink to="/test">
                                        <span>Subcategory 1</span>
                                    </NavLink>
                                </li>
                                <li className="list-element">
                                    <NavLink to="/test">
                                        <span>Subcategory 2</span>
                                    </NavLink>
                                </li>
                                <li className="list-element">
                                    <NavLink to="/test">
                                        <span>Subcategory 3</span>
                                    </NavLink>
                                </li>
                                <li className="list-element">
                                    <NavLink to="/test">
                                        <span>Subcategory 4</span>
                                    </NavLink>
                                </li>
                                <li className="list-element">
                                    <NavLink to="/test">
                                        <span>Subcategory 5</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="shops-container">
                        <h3>Our top parteners</h3>
                        <div className="shop-logos">
                            <div className="shop">
                                <img className="image" src="https://via.placeholder.com/150" alt="brand-logo"></img>
                            </div>
                            <div className="shop">
                                
                            </div>
                            <div className="shop">
                                
                            </div>
                            <div className="shop">
                                
                            </div>
                            <div className="shop">
                                
                            </div>
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryPage