import React from "react";
import './my-orders-menu.css';
import Spinner from "../../spinner/spinner";

const MyOrdersMenu = ({orders, loading}) => {
    console.log(orders);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}-${month}-${year}; ${hours}:${minutes}`;
    };

    if(loading){
        return(
            <div className="my-orders-menu">
                <Spinner/>
            </div>
        );
    }

    return (
        <>
            <div className="my-orders-menu">
                <h2>My Orders</h2>
                {orders && orders.length > 0 ? (
                    <div className="orders-container">
                        {orders.map((order) => (
                            <div key={order._id} className="order-item">
                                <h3>Order number: {order._id}</h3>
                                <p><strong>Status:</strong> {order.status}</p>
                                <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                                <p><strong>Placed at:</strong> {formatDateTime(order.createdAt)}</p>
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