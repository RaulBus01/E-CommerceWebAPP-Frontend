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
                            <OrderSummary key={order._id} id={order._id} date={formatDateTime(order.createdAt)} total={order.totalPrice} status={order.status} distributorId={order.distributorId}/>
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