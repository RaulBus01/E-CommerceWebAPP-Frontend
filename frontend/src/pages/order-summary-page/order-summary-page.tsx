import React from "react";
import './order-summary-page.css';
import { useLocation } from "react-router";

const OrderSummaryPage = () => {
    const location = useLocation();

    const order = location.state?.newOrder;
    console.log(order);
    return(
        <div className="order-summary-container">
            <div className="order-summary-data">
                <h1>Your order summary</h1>
                <div className="personal-data-container">
                    <h2>Personal information</h2>
                    <div className="personal-data-wrapper">
                        <p>Name: {order.name}</p>
                        <p>Phone number: {order.phoneNumber}</p>
                        <p>Payment: {order.paymentMethod}</p>
                    </div>
                    <div className="address-container">
                        <h2>Delivery address</h2>
                        <div className="address-info-wrapper">
                            <p>Country: {order.address.country}</p>
                            <p>County: {order.address.county}</p>
                            <p>City: {order.address.city}</p>
                            <p>Street: {order.address.street}</p>
                            <p>Number: {order.address.number}</p>
                            <p>Zip code: {order.address.zip}</p>
                        </div>
                    </div>
                </div>
                <h1>Ordered products: </h1>
                <div className="ordered-products-container">
                    {order.products.map((product) => (
                        <div key={product.productId} className="product-data">
                            <p>Product ID: {product.productId}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default OrderSummaryPage;