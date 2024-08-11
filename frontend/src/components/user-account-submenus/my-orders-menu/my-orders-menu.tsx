import React from "react";
import './my-orders-menu.css';

import  {formatDateTime}  from "../../../utils/formatDataTime";
import useOrder from "../../../hooks/useOrder";
import OrderSummary from "../../order/orderSummary";


const MyOrdersMenu = ({token}) => {

 
    const { orders, loading: userLoading } = useOrder(token as string);


    if(userLoading){
        return(
            <div className="my-orders-menu">
                <h2>My Orders</h2>
                <p>Loading...</p>
            </div>
        );
    }
  

    return (
        <>
        
            <div className="my-orders-menu">
                <h2>My Orders</h2>
                {orders && orders.length > 0 ? (
                    <>
                        {orders.map((order) => (
                            <OrderSummary order={order} key={order._id}/>
                        ))}
                    </>
                    
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </>
      );
}
export default MyOrdersMenu