import React from "react";
import './my-orders-menu.css';
import Spinner from "../../spinner/spinner";
import  {formatDateTime}  from "../../../utils/formatDataTime";
import useOrder from "../../../hooks/useOrder";

const MyOrdersMenu = ({token}) => {

    console.log(token);
    const { orders, loading: userLoading } = useOrder(token as string);

    if(userLoading){
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