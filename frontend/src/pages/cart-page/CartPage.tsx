import React, { useState } from 'react';
import './cart.css';
import ProductCard from '../../components/product-card/product-card';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([{}, {}]);

    const removeFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">Your cart is empty</div>
            ) : (
                <div className="cart-items">
                    {cartItems.map((_, index) => (
                        <div key={index} className="cart-item">
                            <ProductCard />
                            <button onClick={() => removeFromCart(index)} className="remove-item-button">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartPage;
