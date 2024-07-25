import React from "react";
import './my-orders-menu.css';

const MyOrdersMenu = ({orders, loading}) => {
    console.log(orders);
    return (
        <>
            <div className="my-orders-menu">
                <h2>My Orders</h2>
                {orders && orders.length > 0 ? (
                    <div className="orders-container">
                        {orders.map((order) => (
                            <div key={order.id} className="order-item">
                                <h3>Order ID: {order.id}</h3>
                                <p><strong>Status:</strong> {order.status}</p>
                                <p><strong>Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                                <p><strong>Placed at:</strong> {order.createdAt}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </>
      );
}
export default MyOrdersMenu