import React from "react";
import './favorite-page.css';
import ProductCard from "../../components/product-card/product-card";

const FavoritePage = () => {
    return(
        <>
            <div className="main-container">
                <h1>Your favorite items</h1>
                <div className="items-container">
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </div>
            </div>
        </>
    );
}
export default FavoritePage